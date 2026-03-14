from pymongo import MongoClient
import requests
import time
from datetime import datetime, timedelta, timezone

def seed_test_complaints():
    client = MongoClient("mongodb://localhost:27017")
    db = client["civicsense"]
    complaints = db["complaints"]
    users = db["users"]
    
    # Check if there are already complaints to avoid duplicating if run multiple times
    current_count = complaints.count_documents({})
    if current_count >= 5:
        print(f"Test complaints already exist ({current_count} found). Skipping seeding.")
        return

    # Find a default citizen user
    citizen = users.find_one({"role": "citizen"})
    citizen_id = str(citizen["_id"]) if citizen else "anonymous"

    now = datetime.now(timezone.utc)
    
    test_data = [
        {"user_id": citizen_id, "complaint_text": "Garbage overflow in ward 12 Market", "department": "Sanitation", "priority": "high", "status": "pending", "created_at": (now - timedelta(days=1)).isoformat(), "location": "12.9716,77.5946", "upvotes": 14},
        {"user_id": citizen_id, "complaint_text": "Streetlight broken in ward 5", "department": "Electricity", "priority": "medium", "status": "in_progress", "created_at": (now - timedelta(days=3)).isoformat(), "location": "12.9780,77.5990", "upvotes": 2},
        {"user_id": citizen_id, "complaint_text": "Water leakage in main road", "department": "Water Supply", "priority": "high", "status": "pending", "created_at": (now - timedelta(days=0)).isoformat(), "location": "12.9850,77.6000", "upvotes": 22},
        {"user_id": citizen_id, "complaint_text": "Pothole near bus stand", "department": "Road Maint.", "priority": "low", "status": "resolved", "created_at": (now - timedelta(days=5)).isoformat(), "location": "12.9600,77.5800", "upvotes": 5},
        {"user_id": citizen_id, "complaint_text": "Traffic signal broken at Central Junction", "department": "Traffic", "priority": "high", "status": "pending", "created_at": (now - timedelta(days=2)).isoformat(), "location": "12.9700,77.5900", "upvotes": 48}
    ]
    
    result = complaints.insert_many(test_data)
    print(f"✅ Successfully inserted {len(result.inserted_ids)} highly realistic test complaints.")

if __name__ == "__main__":
    seed_test_complaints()
