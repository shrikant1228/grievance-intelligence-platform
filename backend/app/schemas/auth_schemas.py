from pydantic import BaseModel
from typing import Optional

class SendOTPRequest(BaseModel):
    phone: str

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str

class SignupRequest(BaseModel):
    username: str
    phone: str
    password: str
    mpin: str
    role: str = "citizen"
    department_id: Optional[str] = None

class LoginRequest(BaseModel):
    phone: str
    mpin: str
