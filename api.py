from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from linkedin_clone import LinkedInClone
import os
import shutil
import uuid

app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount static files to serve uploaded images
app.mount("/static", StaticFiles(directory="static"), name="static")

clone = LinkedInClone()

class InMailRequest(BaseModel):
    sender: str
    recipient: str
    context: str

class ConnectRequest(BaseModel):
    sender: str
    recipient: str

class SearchRequest(BaseModel):
    query: str
    filters: str

class ContentRequest(BaseModel):
    content_type: str
    topic: str
    length: str = None

class GeoSyncRequest(BaseModel):
    location: str

class JobSearchRequest(BaseModel):
    query: str

class JobPostRequest(BaseModel):
    title: str
    company: str
    location: str
    description: str
    posted_by: str
    salary_range: str

class SaveItemRequest(BaseModel):
    user_id: str
    item_id: str
    item_type: str
    item_data: dict

@app.post("/api/profile")
async def build_profile(
    name: str = Form(...),
    headline: str = Form(...),
    summary: str = Form(...),
    experience: str = Form(...),
    education: str = Form(...),
    skills: str = Form(...),
    photo: UploadFile = File(...)
):
    # Save the photo
    file_extension = os.path.splitext(photo.filename)[1]
    file_name = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)
    
    photo_url = f"http://localhost:8000/static/uploads/{file_name}"
    user_id = name.lower().replace(" ", "_")
    
    profile = clone.build_profile(user_id, name, photo_url, headline, summary, experience, education, skills)
    if not profile:
        raise HTTPException(status_code=500, detail="Failed to generate profile")
    return profile

@app.post("/api/inmail")
async def send_inmail(req: InMailRequest):
    message = clone.send_inmail(req.sender, req.recipient, req.context)
    if not message:
        raise HTTPException(status_code=500, detail="Failed to generate InMail")
    return {"message": message}

@app.post("/api/connect")
async def connect(req: ConnectRequest):
    success = clone.connect(req.sender, req.recipient)
    if not success:
        raise HTTPException(status_code=500, detail="Connection failed")
    return {"status": "connected"}

@app.post("/api/search")
async def search(req: SearchRequest):
    results = clone.advanced_search(req.query, req.filters)
    if not results:
        raise HTTPException(status_code=500, detail="Search failed")
    return results
@app.get("/api/search/suggestions")
async def search_suggestions(q: str):
    results = clone.get_search_suggestions(q)
    return results
@app.post("/api/content")
async def generate_content(req: ContentRequest):
    content = clone.generate_content(req.content_type, req.topic, req.length)
    if not content:
        raise HTTPException(status_code=500, detail="Content generation failed")
    return {"content": content}

@app.post("/api/geo/sync")
async def sync_geo(req: GeoSyncRequest):
    data = clone.sync_geo(req.location)
    if not data:
        raise HTTPException(status_code=500, detail="Geo sync failed")
    return data

@app.post("/api/jobs/search")
async def search_jobs(req: JobSearchRequest):
    results = clone.search_jobs(req.query)
    return {"items": results}

@app.post("/api/jobs/post")
async def post_job(req: JobPostRequest):
    success = clone.post_job(
        req.title, 
        req.company, 
        req.location, 
        req.description, 
        req.posted_by, 
        req.salary_range
    )
    if not success:
        raise HTTPException(status_code=500, detail="Job posting failed")
    return {"status": "success", "message": "Job posted successfully"}

@app.post("/api/vault/save")
async def save_to_vault(req: SaveItemRequest):
    success = clone.save_item(req.user_id, req.item_id, req.item_type, req.item_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to save item")
    return {"status": "success"}

@app.get("/api/vault/{user_id}")
async def get_vault(user_id: str):
    vault = clone.get_vault(user_id)
    return vault

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
