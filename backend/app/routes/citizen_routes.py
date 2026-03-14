from fastapi import APIRouter, HTTPException
from app.db.mongodb import complaints_collection

router = APIRouter()

@router.get("/my-complaints")
def get_my_complaints(user_id: str):
    try:
        cursor = complaints_collection.find({"user_id": user_id}).sort("created_at", -1)
        
        complaints = []
        for doc in cursor:
            complaint = {
                "id": str(doc["_id"]),
                "complaint_text": doc.get("complaint_text", ""),
                "department": doc.get("department", ""),
                "priority": doc.get("priority", "medium"),
                "status": doc.get("status", "pending"),
                "created_at": doc.get("created_at", ""),
                "upvotes": doc.get("upvotes", 0)
            }
            complaints.append(complaint)
            
        return {"complaints": complaints}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to fetch citizen complaints")
