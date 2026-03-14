from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import jwt
import os

SECRET_KEY = "super-secret-jwt-key-for-hackathon"
ALGORITHM = "HS256"

# Define protected routes and their required roles
PROTECTED_ROUTES = {
    "/api/admin": ["admin"],
    "/api/department": ["department", "admin"],
    "/api/citizen": ["citizen", "admin"]
}

async def auth_middleware(request: Request, call_next):
    path = request.url.path
    
    # Check if path needs protection
    required_roles = None
    for route, roles in PROTECTED_ROUTES.items():
        if path.startswith(route):
            required_roles = roles
            break
            
    if required_roles:
        # Try extracting from Auth Header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401, 
                content={"detail": "Missing authentication token"}
            )
            
        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_role = payload.get("role")
            
            if user_role not in required_roles:
                return JSONResponse(
                    status_code=403, 
                    content={"detail": "Insufficient permissions for this route"}
                )
                
            # Attach user details to request state for downstream handlers
            request.state.user = payload
            
        except jwt.ExpiredSignatureError:
            return JSONResponse(status_code=401, content={"detail": "Token expired"})
        except jwt.InvalidTokenError:
            return JSONResponse(status_code=401, content={"detail": "Invalid token"})
            
    response = await call_next(request)
    return response
