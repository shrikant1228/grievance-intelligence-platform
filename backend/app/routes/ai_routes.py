from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import analyze_complaint

router = APIRouter()

class ComplaintInput(BaseModel):
    complaint_text: str

@router.post("/analyze-complaint")
def analyze(data: ComplaintInput):
    result = analyze_complaint(data.complaint_text)
    return result
