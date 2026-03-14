import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware

from app.routes.ai_routes import router as ai_router
from app.routes.complaint_routes import router as complaint_router
from app.routes.auth_routes import router as auth_router
from app.routes.intelligence_routes import router as intel_router
from app.routes.health_routes import router as health_router
from app.routes.admin_routes import router as admin_router
from app.routes.user_routes import router as user_router
from app.routes.citizen_routes import router as citizen_router
from app.middleware.auth_middleware import auth_middleware

# Load explicit environment config
load_dotenv()

# Setup structured logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("civicsense")

# Initialize Rate Limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="CivicSense AI Backend")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Inject JWT validation middleware
app.add_middleware(BaseHTTPMiddleware, dispatch=auth_middleware)

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(ai_router, prefix="/api", tags=["AI Processing - Standard"])
app.include_router(complaint_router, prefix="/api", tags=["Complaints"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/api/users", tags=["Users"])
app.include_router(citizen_router, prefix="/api/citizen", tags=["Citizen Features"])
app.include_router(intel_router, prefix="/api/ai", tags=["AI Intelligence Layer"])
app.include_router(health_router, prefix="/api/health", tags=["System Health"])
app.include_router(admin_router, prefix="/api/admin", tags=["Admin Dashboard"])

from app.db.mongodb import users_collection

# @app.on_event("startup")
# async def startup_event():
#     logger.info("CivicSense AI Backend starting up... Connecting to NLP Core.")
    
#     # Seed default users if missing
#     import hashlib
#     from datetime import datetime, timezone
    
#     def hash_string(text: str) -> str:
#         return hashlib.sha256(text.encode()).hexdigest()
        
#     defaults = [
#         {"phone": "9999999999", "password": "admin123", "mpin": "1234", "role": "admin"},
#         {"phone": "8888888888", "password": "dept123", "mpin": "1234", "role": "department"},
#         {"phone": "7899047261", "password": "cit123", "mpin": "1234", "role": "citizen"}
#     ]
    
#     for default_user in defaults:
#         if not users_collection.find_one({"phone": default_user["phone"]}):
#             users_collection.insert_one({
#                 "phone": default_user["phone"],
#                 "password_hash": hash_string(default_user["password"]),
#                 "mpin_hash": hash_string(default_user["mpin"]),
#                 "role": default_user["role"],
#                 "created_at": datetime.now(timezone.utc)
#             })
#             logger.info(f"Seeded default {default_user['role']} user.")
@app.on_event("startup")
async def startup_event():
    logger.info("CivicSense AI Backend starting up...")

    try:
        import hashlib
        from datetime import datetime, timezone
        
        def hash_string(text: str) -> str:
            return hashlib.sha256(text.encode()).hexdigest()

        defaults = [
            {"phone": "9999999999", "password": "admin123", "mpin": "1234", "role": "admin"},
            {"phone": "8888888888", "password": "dept123", "mpin": "1234", "role": "department"},
            {"phone": "7899047261", "password": "cit123", "mpin": "1234", "role": "citizen"}
        ]

        for default_user in defaults:
            if not users_collection.find_one({"phone": default_user["phone"]}):
                users_collection.insert_one({
                    "phone": default_user["phone"],
                    "password_hash": hash_string(default_user["password"]),
                    "mpin_hash": hash_string(default_user["mpin"]),
                    "role": default_user["role"],
                    "created_at": datetime.now(timezone.utc)
                })

        logger.info("Default users seeded if missing.")

    except Exception as e:
        logger.error(f"Startup DB check failed: {e}")

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/")
@limiter.limit("10/minute")
def read_root(request: Request):
    logger.info("Root endpoint pinged.")
    return {"message": "CivicSense AI API is running"}
