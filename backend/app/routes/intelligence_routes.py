from fastapi import APIRouter, HTTPException, File, UploadFile
import io
from PIL import Image
from app.db.mongodb import complaints_collection

from app.schemas.intelligence_schemas import (
    DuplicateCheckRequest, DuplicateCheckResponse, 
    HotspotsResponse, ClusterResponse, InsightsResponse, PredictionResponse
)
from app.services.duplicate_detector import is_duplicate
from app.services.hotspot_detector import detect_hotspots
from app.services.complaint_clusterer import cluster_complaints
from app.services.ai_insights import generate_insights

router = APIRouter()

@router.post("/check-duplicate", response_model=DuplicateCheckResponse)
async def check_duplicate_api(req: DuplicateCheckRequest):
    docs = list(complaints_collection.find({}, {"_id": 1, "complaint_text": 1}).sort("created_at", -1).limit(50))
    
    if not docs:
         return {"duplicate": False, "similar_complaint_id": None, "similarity": 0.0}
         
    existing_texts = [row.get("complaint_text", "") for row in docs if "complaint_text" in row]
    existing_ids = [str(row["_id"]) for row in docs if "complaint_text" in row]
    
    # Handle case where list might be empty after filter
    if not existing_texts:
         return {"duplicate": False, "similar_complaint_id": None, "similarity": 0.0}

    dup, score, index = is_duplicate(req.complaint_text, existing_texts)
    
    return {
        "duplicate": dup,
        "similar_complaint_id": existing_ids[index] if index >= 0 and index < len(existing_ids) else None,
        "similarity": score
    }

@router.get("/hotspots", response_model=HotspotsResponse)
async def get_hotspots_api():
    docs = list(complaints_collection.find({}, {"_id": 1, "ward": 1, "created_at": 1}))
    # Convert _id to id to match old schema expectation inside services
    for doc in docs:
        if "_id" in doc:
            doc["id"] = str(doc.pop("_id"))
            
    if not docs:
         return {"hotspots": []}
         
    hotspots = detect_hotspots(docs)
    return {"hotspots": hotspots}

@router.get("/insights", response_model=InsightsResponse)
async def get_insights_api():
    docs = list(complaints_collection.find({}, {"department": 1, "ward": 1, "created_at": 1}))
    if not docs:
         return {"insights": []}
         
    insights = generate_insights(docs)
    return {"insights": insights}

@router.get("/clusters", response_model=ClusterResponse)
async def get_clusters_api():
    docs = list(complaints_collection.find({}, {"_id": 1, "complaint_text": 1}).limit(100))
    for doc in docs:
        if "_id" in doc:
            doc["id"] = str(doc.pop("_id"))
            
    if not docs:
        return {"clusters": {}}
        
    clusters = cluster_complaints(docs)
    return {"clusters": clusters}

@router.get("/predict-issues", response_model=PredictionResponse)
async def get_predict_issues_api():
    from app.services.predictive_forecast import forecast_complaints
    
    docs = list(complaints_collection.find({}, {"ward": 1, "department": 1, "created_at": 1}))
    if not docs:
         return {"predictions": []}
         
    predictions = forecast_complaints(docs)
    return {"predictions": predictions}

@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        import tempfile
        import os
        from app.services.ai_service import analyze_image as pytorch_analyze
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(contents)
            temp_path = temp_file.name
            
        try:
            # Pass absolute temp path to YOLOv8
            detected_objects = pytorch_analyze(temp_path)
            
            # Formulate the response
            detected_issue = ", ".join(detected_objects).title() if detected_objects else "Unknown Civics Issue"
        finally:
            os.remove(temp_path)
            
        return {
            "detected_issue": detected_issue,
            "detected_objects": detected_objects
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
