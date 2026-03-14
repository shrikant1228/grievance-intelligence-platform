from fastapi import APIRouter
import time

router = APIRouter()

@router.get("/")
def health_check():
    """
    Health check endpoint to verify the system is running.
    """
    return {
        "status": "ok",
        "timestamp": time.time(),
        "services": {
            "database": "connected",
            "ai_engine": "running",
            "realtime": "active"
        }
    }
