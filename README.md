# NEURAL_LINK: The Futuristic LinkedIn Clone

A high-performance, AI-driven professional networking prototype featuring a futuristic glass-morphism interface and a robust Neural Backend powered by Groq.

## Project Structure

- `api.py`: FastAPI backend that serves the AI features.
- `linkedin_clone.py`: Core logic for AI profile building, networking, and content generation.
- `frontend/`: A React + Vite + Tailwind CSS frontend with a futuristic "Cyber" design.
- `requirements.txt`: Python dependencies.
- `.env`: Environment variables (holds your `GROQ_API_KEY`).

## Features Implemented

- **Neural Profile Builder**: Generate structured professional data from raw neural input (text).
- **Global Hive Networking**: AI-assisted InMail drafting and connection mapping.
- **Quantum Search**: Intelligent professional scanning via Groq's LLM tools.
- **Pulse Content Gen**: Automated generation of viral posts, polls, and newsletters.

## Installation & Setup

### 1. Backend Setup
```bash
# Ubuntu/Linux
sudo apt update
sudo apt install python3-pip python3-venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Launch the Pulse
Run both the backend and frontend with a single command:
```bash
./start_all.sh
```
or manually:
- Backend: `python3 api.py` (Port 8000)
- Frontend: `cd frontend && npm run dev` (Port 5173)

## Environment Variables
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=gsk_your_api_key_here
```
