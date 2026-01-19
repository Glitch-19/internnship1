#!/bin/bash

# Start FastAPI backend in the background
echo "Starting Backend API..."
source venv/bin/activate
python3 api.py &

# Start Vite frontend
echo "Starting Frontend..."
cd frontend
npm run dev
