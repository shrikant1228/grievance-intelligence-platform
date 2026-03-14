from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.db.mongodb import complaints_collection
from bson import ObjectId

router = APIRouter()

class ComplaintInput(BaseModel):
    user_id: str
    complaint_text: str
    latitude: float
    longitude: float
    department: str
    priority: str
    image_url: str | None = None


@router.post("/complaints")
async def submit_complaint(data: ComplaintInput):
    try:
        from datetime import datetime, timezone
        from app.services.ai_service import analyze_complaint, analyze_image
        import os
        
        # Analyze Text via Transformers
        ai_output = analyze_complaint(data.complaint_text)
        
        # Analyze Image if provided
        image_ai_result = []
        if data.image_url and data.image_url.startswith("http"):
            import urllib.request
            import tempfile
            
            # Create the temp file and immediately close it so Windows doesn't lock it
            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
                temp_path = temp_file.name
                
            try:
                # Download remote Cloudinary/S3 image payload to local temp
                urllib.request.urlretrieve(data.image_url, temp_path)
                image_ai_result = analyze_image(temp_path)
            except Exception as e:
                print("Failed to download or analyze remote image:", e)
            finally:
                if os.path.exists(temp_path):
                    try:
                        os.remove(temp_path)
                    except OSError:
                        pass
                        
            # Advanced Smart Civic AI Workflow Override
            # Visually override the text category if the CNN definitively detected priorities
            lower_objects = [obj.lower() for obj in image_ai_result]
            if "dog" in lower_objects or "animal" in lower_objects or "bird" in lower_objects or "cat" in lower_objects:
                ai_output["department"] = "Stray animals"
                ai_output["priority"] = "High"
            elif "garbage" in lower_objects or "trash" in lower_objects or "bottle" in lower_objects:
                ai_output["department"] = "Garbage"
            elif "pothole" in lower_objects:
                ai_output["department"] = "Pothole"

        complaint_payload = {
            "user_id": data.user_id,
            "text": data.complaint_text,
            "location": f"{data.latitude},{data.longitude}",
            "department": ai_output["department"],
            "category": ai_output["department"],
            "priority": ai_output["priority"],
            "urgency": ai_output["priority"],
            "confidence": ai_output["confidence"],
            "status": "pending",
            "image_url": data.image_url,
            "image_ai_result": image_ai_result,
            "upvotes": 0,
            "created_at": datetime.now(timezone.utc).isoformat()
        }

        result = complaints_collection.insert_one(complaint_payload)
        
        # Remove _id from payload for json serialization since we added it to result
        complaint_payload.pop("_id", None)
        
        return {
            "message": "Complaint submitted successfully",
            "data": [{"id": str(result.inserted_id), **complaint_payload}]
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/complaints/{complaint_id}/upvote")
def upvote_complaint(complaint_id: str):
    try:
        obj_id = ObjectId(complaint_id)
    except:
        return {"message": "Invalid complaint ID", "status": 400}

    # Fetch current
    res = complaints_collection.find_one({"_id": obj_id})
    if not res:
        # If it doesn't exist, we can't upvote
        return {"message": "Complaint not found", "status": 404}
    
    current_upvotes = res.get("upvotes", 0)
    new_upvotes = current_upvotes + 1
    
    # Update MongoDB
    complaints_collection.update_one(
        {"_id": obj_id}, 
        {"$set": {"upvotes": new_upvotes}}
    )
    
    return {
        "message": "Complaint upvoted successfully",
        "new_upvotes": new_upvotes
    }

