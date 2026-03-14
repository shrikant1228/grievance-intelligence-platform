import subprocess
import time
import requests
import os
import sys

# Change to project root if running from scripts directory
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
os.chdir(project_root)

print("Starting System Test...")

print("\nStep 1: Starting Backend Automatically")
backend = subprocess.Popen(["python", "backend/run.py"])

print("Waiting for backend to initialize...")
time.sleep(8)
max_retries = 15
ready = False
for i in range(max_retries):
    try:
        res = requests.get("http://localhost:8000/api/health")
        if res.status_code == 200:
            ready = True
            print("Backend is ready!")
            break
    except requests.ConnectionError:
        pass
    time.sleep(1)

if not ready:
    print("[ERROR] Backend failed to start. Exiting tests.")
    backend.terminate()
    sys.exit(1)

print("\nStep 2: Running Demo Data Seeder")
subprocess.run([sys.executable, "scripts/seed_demo_data.py"])

print("\nStep 3: Running API Tests")
BASE_URL = "http://localhost:8000"

def test_endpoint(name, method, endpoint, data=None):
    url = BASE_URL + endpoint
    try:
        if method == "GET":
            res = requests.get(url)
        else:
            res = requests.post(url, json=data)

        if res.status_code == 200:
            print(f"[PASS] {name}")
        else:
            print(f"[FAIL] {name} - Status {res.status_code}")
    except Exception as e:
        print(f"[ERROR] {name} - {e}")

# Run tests
test_endpoint("Health API", "GET", "/api/health")

test_endpoint(
    "AI Complaint Analysis",
    "POST",
    "/api/analyze-complaint",
    {
        "complaint_text": "Garbage not collected near bus stop"
    }
)

test_endpoint(
    "Submit Complaint",
    "POST",
    "/api/complaints",
    {
        "complaint_text": "Pothole near MG Road",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "department": "Road Maintenance",
        "priority": "Medium",
        "image_url": "demo.jpg"
    }
)

test_endpoint(
    "Duplicate Complaint Detection",
    "POST",
    "/api/ai/check-duplicate",
    {
        "complaint_text": "Garbage piling up near bus stop"
    }
)

test_endpoint("Hotspot Detection", "GET", "/api/ai/hotspots")

test_endpoint("Predictive Civic Forecast", "GET", "/api/ai/predict-issues")

print("\nStep 4: Shutting Down Backend")
backend.terminate()
backend.wait()

print("\nSystem Test Completed")
