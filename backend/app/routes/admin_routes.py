from fastapi import APIRouter, HTTPException
from app.db.mongodb import complaints_collection

router = APIRouter()

@router.get("/stats")
async def get_admin_stats():
    try:
        from datetime import datetime, timedelta, timezone
        
        total = complaints_collection.count_documents({})
        pending = complaints_collection.count_documents({"status": "pending"})
        in_progress = complaints_collection.count_documents({"status": "in_progress"})
        resolved = complaints_collection.count_documents({"status": "resolved"})
        high_priority = complaints_collection.count_documents({"priority": "high"})

        # Department Aggregation
        dept_pipeline = [
            {"$group": {"_id": "$department", "value": {"$sum": 1}}},
            {"$project": {"name": "$_id", "value": 1, "_id": 0}},
            {"$sort": {"value": -1}}
        ]
        department_data = list(complaints_collection.aggregate(dept_pipeline))

        # Date Trend Aggregation (last 7 days logic)
        now = datetime.now(timezone.utc)
        last_7_days = []
        for i in range(6, -1, -1):
            target_date = now - timedelta(days=i)
            # Find all complaints created on this day string prefix
            prefix = target_date.strftime("%Y-%m-%d")
            count = complaints_collection.count_documents({"created_at": {"$regex": f"^{prefix}"}})
            day_name = target_date.strftime("%a")
            last_7_days.append({"date": day_name, "complaints": count})

        return {
            "total": total,
            "pending": pending,
            "in_progress": in_progress,
            "resolved": resolved,
            "high_priority": high_priority,
            "departmentData": department_data,
            "trendData": last_7_days
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to fetch admin stats")
