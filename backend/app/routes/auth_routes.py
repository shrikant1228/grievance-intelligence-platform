import os
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta, timezone
import jwt
import hashlib

from app.schemas.auth_schemas import SendOTPRequest, VerifyOTPRequest, SignupRequest, LoginRequest
from app.db.mongodb import users_collection

router = APIRouter()

SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-jwt-key-for-hackathon")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# In-memory OTP store for MVP
otp_store = {}


def hash_string(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()


def create_access_token(data: dict):
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


# ---------------- OTP ----------------

@router.post("/send-otp")
async def send_otp(req: SendOTPRequest):
    otp = "123456"

    otp_store[req.phone] = {
        "otp": otp,
        "expires_at": datetime.now(timezone.utc) + timedelta(minutes=5)
    }

    return {
        "message": "OTP sent successfully",
        "otp_demo": otp,
        "expires_in_minutes": 5
    }


@router.post("/verify-otp")
async def verify_otp(req: VerifyOTPRequest):

    record = otp_store.get(req.phone)

    if not record:
        raise HTTPException(status_code=400, detail="OTP not found")

    if datetime.now(timezone.utc) > record["expires_at"]:
        del otp_store[req.phone]
        raise HTTPException(status_code=400, detail="OTP expired")

    if req.otp != record["otp"]:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    del otp_store[req.phone]

    return {
        "message": "OTP verified successfully",
        "verified": True
    }


# ---------------- SIGNUP ----------------

@router.post("/signup")
async def signup(req: SignupRequest):

    existing = users_collection.find_one({"phone": req.phone})

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = {
        "username": req.username,
        "phone": req.phone,
        "password_hash": hash_string(req.password),
        "mpin_hash": hash_string(req.mpin),
        "role": "citizen" if req.role not in ["admin", "department", "citizen"] else req.role,
        "department_id": req.department_id,
        "created_at": datetime.now(timezone.utc)
    }

    result = users_collection.insert_one(user)

    return {
        "message": "User created successfully",
        "user_id": str(result.inserted_id)
    }


# ---------------- LOGIN ----------------

@router.post("/login")
async def login(req: LoginRequest):

    user = users_collection.find_one({"phone": req.phone})

    # DEMO MODE (user not found)
    if not user:

        role = "citizen"

        if req.phone.startswith("1"):
            role = "admin"

        elif req.phone.startswith("2"):
            role = "department"

        token = create_access_token({
            "sub": req.phone,
            "role": role
        })

        return {
            "access_token": token,
            "token": token,
            "token_type": "bearer",
            "role": role,
            "user_id": f"demo_{req.phone}",
            "username": f"Demo {role.capitalize()}",
            "phone": req.phone
        }

    # REAL USER LOGIN

    mpin_hash = hash_string(req.mpin)

    if user.get("mpin_hash") != mpin_hash:
        raise HTTPException(status_code=401, detail="Invalid phone number or MPIN")

    token = create_access_token({
        "sub": str(user["_id"]),
        "phone": user["phone"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token": token,
        "token_type": "bearer",
        "role": user["role"],
        "user_id": str(user["_id"]),
        "username": user.get("username", "Citizen"),
        "phone": user["phone"]
    }


# ---------------- GET CURRENT USER ----------------

@router.get("/me")
async def get_me(token: str):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"user": payload}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------- LOGOUT ----------------

@router.post("/logout")
async def logout():
    return {"message": "Logout successful"}