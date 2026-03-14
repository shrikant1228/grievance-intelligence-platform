import subprocess
import time
import webbrowser
import os
import sys

print("\nStarting CivicSense AI Platform...\n")

# Step 1: Install backend dependencies
print("Installing backend dependencies...")
subprocess.run([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])

# Step 2: Start backend
print("Starting FastAPI backend...")
backend = subprocess.Popen([sys.executable, "backend/run.py"])

import urllib.request
import urllib.error

print("\nWaiting for FastAPI backend to initialize...")
max_retries = 30
for i in range(max_retries):
    try:
        urllib.request.urlopen("http://localhost:8000/api/health")
        print("✅ Backend is up and running!")
        break
    except urllib.error.URLError:
        print(f"Waiting for backend... ({i+1}/{max_retries})")
        time.sleep(1)
        if i == max_retries - 1:
            print("❌ Backend failed to start. Exiting.")
            sys.exit(1)

# Step 3: Install frontend dependencies
print("\nInstalling frontend dependencies...")
npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
subprocess.run([npm_cmd, "install"], cwd="frontend")

# Step 4: Start frontend
print("Starting Next.js frontend...")
frontend = subprocess.Popen([npm_cmd, "run", "dev"], cwd="frontend")

time.sleep(8)

# Step 5: Open browser
print("Opening CivicSense AI in browser...")
webbrowser.open("http://localhost:3000")

print("\nCivicSense AI Platform Running!\n")
print("Frontend: http://localhost:3000")
print("Backend Docs: http://localhost:8000/docs\n")

try:
    backend.wait()
    frontend.wait()
except KeyboardInterrupt:
    print("\nStopping servers...")
    backend.terminate()
    frontend.terminate()
