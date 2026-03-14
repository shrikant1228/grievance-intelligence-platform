from fastapi import APIRouter, HTTPException
from app.db.mongodb import users_collection
from bson import ObjectId

router = APIRouter()

@router.get("/me")
def get_me(user_id: str):
    try:
        obj_id = ObjectId(user_id)
        user = users_collection.find_one({"_id": obj_id})
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return {
            "user_id": str(user["_id"]),
            "username": user.get("username", "Citizen"),
            "phone": user.get("phone", ""),
            "role": user.get("role", "citizen")
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to fetch user profile")
