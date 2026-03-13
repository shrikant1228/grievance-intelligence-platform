from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
import uvicorn
import os
import shutil
from pathlib import Path

app = FastAPI(
    title="Grievance Intelligence Platform",
    description="AI-Powered Public Grievance System for Bengaluru",
    version="1.0.0"
)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# In-memory database
complaints_db = []
complaint_counter = 0

# AI Analysis Function
def analyze_complaint(text: str):
    """Analyze complaint text to determine category and urgency"""
    text_lower = text.lower()
    
    # Category detection (English + Hindi + Kannada)
    categories = {
        "Pothole": ["pothole", "road", "गड्ढा", "ಕುಳಿ", "crater", "broken road"],
        "Garbage": ["garbage", "waste", "trash", "कचरा", "ಕಸ", "dump", "litter"],
        "Water": ["water", "pipe", "leak", "पानी", "ನೀರು", "supply", "cauvery"],
        "Sewage": ["sewage", "drain", "सीवेज", "ಚರಂಡಿ", "blocked", "overflow", "manhole"],
        "Street Light": ["light", "street light", "बिजली", "ದೀಪ", "lamp", "dark"],
        "Encroachment": ["encroachment", "illegal", "अतिक्रमण", "ಅತಿಕ್ರಮಣ", "footpath"],
        "Tree": ["tree", "पेड़", "ಮರ", "branch", "fallen"],
        "Stray Animals": ["stray", "dog", "animal", "आवारा", "ದಾರಿ ತಪ್ಪಿದ"]
    }
    
    # Find matching category
    detected_category = "Other"
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword.lower() in text_lower:
                detected_category = category
                break
        if detected_category != "Other":
            break
    
    # Urgency detection
    urgent_keywords = [
        "dangerous", "burst", "emergency", "accident", "urgent", 
        "leaking", "flood", "collapse", "blocked", "overflow",
        "बहुत", "तुरंत", "ತುರ್ತು", "ಅಪಾಯ"
    ]
    
    urgency = "HIGH" if any(word in text_lower for word in urgent_keywords) else "NORMAL"
    
    return detected_category, urgency

@app.get("/")
def root():
    return {
        "message": "🇮🇳 Grievance Intelligence API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "complaints": "/api/complaints",
            "complaints_with_image": "/api/complaints-with-image",
            "stats": "/api/stats"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

# NEW: Complaint with image upload
@app.post("/api/complaints-with-image")
async def create_complaint_with_image(
    text: str = Form(...),
    location: str = Form(...),
    name: str = Form(...),
    phone: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None)
):
    global complaint_counter
    complaint_counter += 1
    
    # Analyze with AI
    category, urgency = analyze_complaint(text)
    
    # Handle image upload
    image_url = None
    if image:
        # Create unique filename
        file_extension = os.path.splitext(image.filename)[1]
        filename = f"complaint_{complaint_counter}_{datetime.now().strftime('%Y%m%d_%H%M%S')}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Save image
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        image_url = f"/uploads/{filename}"
    
    # Create complaint record
    new_complaint = {
        "id": complaint_counter,
        "text": text,
        "location": location,
        "name": name,
        "phone": phone,
        "category": category,
        "urgency": urgency,
        "status": "pending",
        "image_url": image_url,
        "created_at": datetime.now().isoformat()
    }
    
    complaints_db.append(new_complaint)
    
    return {
        "message": "✅ Complaint registered successfully",
        "complaint": new_complaint,
        "ai_analysis": {
            "category": category,
            "urgency": urgency
        }
    }

# Keep original endpoint for text-only complaints
@app.post("/api/complaints")
async def create_complaint_text_only(
    text: str = Form(...),
    location: str = Form(...),
    name: str = Form(...),
    phone: Optional[str] = Form(None)
):
    return await create_complaint_with_image(text, location, name, phone, None)

@app.get("/api/complaints")
def get_complaints():
    # Sort by newest first
    sorted_complaints = sorted(complaints_db, key=lambda x: x["id"], reverse=True)
    return {
        "total": len(complaints_db),
        "complaints": sorted_complaints
    }

@app.get("/api/complaints/{complaint_id}")
def get_complaint(complaint_id: int):
    for complaint in complaints_db:
        if complaint["id"] == complaint_id:
            return complaint
    return {"error": "Complaint not found"}, 404

@app.get("/api/stats")
def get_stats():
    total = len(complaints_db)
    pending = len([c for c in complaints_db if c["status"] == "pending"])
    resolved = len([c for c in complaints_db if c["status"] == "resolved"])
    high_urgency = len([c for c in complaints_db if c["urgency"] == "HIGH"])
    with_images = len([c for c in complaints_db if c.get("image_url")])
    
    # Category breakdown
    categories = {}
    for c in complaints_db:
        cat = c["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    return {
        "total": total,
        "pending": pending,
        "resolved": resolved,
        "high_urgency": high_urgency,
        "with_images": with_images,
        "categories": categories
    }

@app.put("/api/complaints/{complaint_id}/status")
def update_status(complaint_id: int, status: str):
    for complaint in complaints_db:
        if complaint["id"] == complaint_id:
            complaint["status"] = status
            return {"message": f"Status updated to {status}"}
    return {"error": "Complaint not found"}, 404

if __name__ == "__main__":
    print("=" * 60)
    print("🚀 GRIEVANCE INTELLIGENCE PLATFORM")
    print("=" * 60)
    print("📡 Server: http://localhost:8000")
    print("📚 API Docs: http://localhost:8000/docs")
    print("📸 Image Upload: /api/complaints-with-image")
    print("📁 Uploads folder: ./uploads")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
