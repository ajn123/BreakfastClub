from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Events API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://root:example@localhost:27017/'))
db = client.events_db
collection = db.events

# Pydantic models
class Event(BaseModel):
    title: str
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[dict] = None
    admission: Optional[str] = None
    source_url: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None

class EventResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[dict] = None
    admission: Optional[str] = None
    source_url: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None

@app.get("/")
async def root():
    return {"message": "Events API is running"}

@app.get("/events", response_model=List[EventResponse])
async def get_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    tags: Optional[List[str]] = Query(None)
):
    """
    Get events with filtering and pagination
    """
    query = {}
    
    # Add search filter
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    # Add date range filter
    if date_from or date_to:
        query["date"] = {}
        if date_from:
            query["date"]["$gte"] = date_from
        if date_to:
            query["date"]["$lte"] = date_to
    
    # Add tags filter
    if tags:
        query["tags"] = {"$all": tags}
    
    try:
        cursor = collection.find(query).skip(skip).limit(limit)
        events = []
        async for doc in cursor:
            doc['id'] = str(doc.pop('_id'))
            events.append(EventResponse(**doc))
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str):
    """
    Get a single event by ID
    """
    from bson.objectid import ObjectId
    try:
        event = await collection.find_one({"_id": ObjectId(event_id)})
        if event:
            event['id'] = str(event.pop('_id'))
            return EventResponse(**event)
        raise HTTPException(status_code=404, detail="Event not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/events", response_model=EventResponse)
async def create_event(event: Event):
    """
    Create a new event
    """
    try:
        event_dict = event.dict()
        event_dict['created_at'] = datetime.utcnow()
        result = await collection.insert_one(event_dict)
        event_dict['id'] = str(result.inserted_id)
        return EventResponse(**event_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/events/{event_id}", response_model=EventResponse)
async def update_event(event_id: str, event: Event):
    """
    Update an existing event
    """
    from bson.objectid import ObjectId
    try:
        event_dict = event.dict()
        event_dict['updated_at'] = datetime.utcnow()
        result = await collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": event_dict}
        )
        if result.modified_count:
            event_dict['id'] = event_id
            return EventResponse(**event_dict)
        raise HTTPException(status_code=404, detail="Event not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/events/{event_id}")
async def delete_event(event_id: str):
    """
    Delete an event
    """
    from bson.objectid import ObjectId
    try:
        result = await collection.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count:
            return {"message": "Event deleted successfully"}
        raise HTTPException(status_code=404, detail="Event not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 