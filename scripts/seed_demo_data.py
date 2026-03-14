import os
import sys
import random
from datetime import datetime, timedelta, timezone

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.app.db.mongodb import complaints_collection

DEPARTMENTS = ["Sanitation", "Road Maintenance", "Electricity", "Water Supply", "Traffic", "Drainage"]
WARDS = ["Whitefield", "Indiranagar", "Koramangala", "Jayanagar", "Malleshwaram", "Hebbal"]
PRIORITIES = ["High", "Medium", "Low"]
STATUSES = ["pending", "in_progress", "resolved"]

SAMPLE_TEXTS = [
    "Garbage has not been collected for 3 days near the main market.",
    "Massive pothole causing severe traffic jams during peak hours.",
    "Streetlight on 4th cross is completely dead.",
    "Sewage water overflowing onto the pedestrian walkway.",
    "No drinking water supply since yesterday morning.",
    "Traffic signals at the major junction are malfunctioning.",
    "Broken footpath tiles making it dangerous for senior citizens.",
    "Illegal dumping of construction debris on the empty corner lot.",
    "Water pipe burst flooding the residential street.",
    "Fallen tree blocking the arterial road after the storm."
]

def generate_random_coordinate(base_lat=12.9716, base_lng=77.5946, offset=0.05):
    return {
        "lat": base_lat + random.uniform(-offset, offset),
        "lng": base_lng + random.uniform(-offset, offset)
    }

def seed_database():
    print("Connecting to MongoDB...")

    print("Dropping old table data...")
    try:
         complaints_collection.delete_many({})
    except Exception as e:
         print(f"Warning: Could not clear old data: {e}")

    print("Generating 50 random complaint records...")
    complaints = []
    now = datetime.now(timezone.utc)
    
    for i in range(50):
        # Create timestamps spreading backwards over the last 14 days
        days_ago = random.randint(0, 14)
        created_at = (now - timedelta(days=days_ago, minutes=random.randint(0, 1440))).isoformat()
        
        dept = random.choice(DEPARTMENTS)
        text = random.choice(SAMPLE_TEXTS)
        
        # Override text loosely based on dept
        if dept == "Sanitation": text = "Trash piling up near the residential complex."
        elif dept == "Road Maintenance": text = "Deep pothole damaging vehicles."
        elif dept == "Electricity": text = "Transformer sparking dangerously."
        
        coord = generate_random_coordinate()
        
        complaint = {
            "citizen_id": f"mock-cit-{random.randint(100, 999)}",
            "complaint_text": text,
            "department": dept,
            "ward": random.choice(WARDS),
            "priority": random.choice(PRIORITIES),
            "status": random.choice(STATUSES),
            "location": f"POINT({coord['lng']} {coord['lat']})",
            "address_text": f"Near {random.randint(1, 15)}th Main, Bangalore",
            "created_at": created_at,
            "updated_at": created_at,
            "upvotes": random.randint(0, 25)
        }
        complaints.append(complaint)

    print("Inserting into MongoDB...")
    try:
        response = complaints_collection.insert_many(complaints)
        print(f"Successfully seeded {len(response.inserted_ids)} records!")
    except Exception as e:
        print(f"Insertion failed. If table structure isn't ready, this is expected: {e}")

    try:
        from backend.app.db.mongodb import users_collection
        from backend.app.routes.auth_routes import hash_string
        
        users_collection.delete_many({})
        admin_user = {
            "phone": "9999999999",
            "password_hash": hash_string("admin123"),
            "mpin_hash": hash_string("1234"),
            "role": "admin",
            "department_id": None,
            "created_at": datetime.now(timezone.utc)
        }
        dept_user = {
            "phone": "8888888888",
            "password_hash": hash_string("dept123"),
            "mpin_hash": hash_string("1234"),
            "role": "department",
            "department_id": "Road Maintenance",
            "created_at": datetime.now(timezone.utc)
        }
        users_collection.insert_many([admin_user, dept_user])
        print("Successfully seeded Admin (9999999999) and Department (8888888888) users!")
    except Exception as e:
        print(f"Failed to seed demo users: {e}")

if __name__ == "__main__":
    seed_database()
