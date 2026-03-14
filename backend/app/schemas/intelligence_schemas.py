from pydantic import BaseModel
from typing import Optional, List

class DuplicateCheckRequest(BaseModel):
    complaint_text: str

class DuplicateCheckResponse(BaseModel):
    duplicate: bool
    similar_complaint_id: Optional[str] = None
    similarity: float

class HotspotResponseItem(BaseModel):
    ward: str
    complaints: int
    trend: str

class HotspotsResponse(BaseModel):
    hotspots: List[HotspotResponseItem]

class ClusterResponse(BaseModel):
    clusters: dict

class InsightsResponse(BaseModel):
    insights: List[str]

class PredictionItem(BaseModel):
    ward: str
    department: Optional[str] = None
    trend: str
    predicted_complaints_next_week: int

class PredictionResponse(BaseModel):
    predictions: List[PredictionItem]
