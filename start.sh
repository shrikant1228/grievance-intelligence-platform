#!/bin/bash

echo -e "\nStarting CivicSense AI Platform...\n"

# Step 1: Install backend dependencies
echo "Installing backend dependencies..."
python3 -m pip install -r backend/requirements.txt

# Step 2: Start backend
echo "Starting FastAPI backend..."
python3 backend/run.py &
BACKEND_PID=$!

sleep 6

# Step 3: Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Step 4: Start frontend
echo "Starting Next.js frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

sleep 8

# Step 5: Open browser
echo "Opening CivicSense AI in browser..."
if which xdg-open > /dev/null
then
  xdg-open "http://localhost:3000"
elif which open > /dev/null
then
  open "http://localhost:3000"
fi

echo -e "\nCivicSense AI Platform Running!\n"
echo "Frontend: http://localhost:3000"
echo "Backend Docs: http://localhost:8000/docs"
echo -e "\nPress Ctrl+C to stop all servers."

# Define cleanup function
cleanup() {
  echo -e "\nStopping servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Trap KeyboardInterrupt (Ctrl+C)
trap cleanup SIGINT

# Wait for background processes
wait $BACKEND_PID
wait $FRONTEND_PID
