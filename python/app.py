from fastapi import FastAPI, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field
import uvicorn

app = FastAPI()

# MongoDB connection
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)
db = client.events_db

# Models
class EventBase(BaseModel):
    title: str
    description: str
    image: str
    date: datetime
    source: str = "manual"  # manual, eventbrite, meetup, etc.
    location: dict = Field(default_factory=dict)
    
class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_alias = True

# Routes
@app.get("/api/events", response_model=List[Event])
async def get_events(
    limit: int = Query(5, gt=0),
    page: int = Query(1, gt=0),
    source: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    skip = (page - 1) * limit
    query = {}
    
    if source:
        query["source"] = source
        
    if start_date or end_date:
        date_query = {}
        if start_date:
            date_query["$gte"] = start_date
        if end_date:
            date_query["$lte"] = end_date
        query["date"] = date_query

    cursor = db.events.find(query)
    cursor.sort("date", ASCENDING).skip(skip).limit(limit)
    
    events = await cursor.to_list(length=limit)
    if not events:
        raise HTTPException(status_code=404, detail="No events found")
    
    return events

@app.post("/api/events", response_model=Event)
async def create_event(event: EventCreate):
    event_dict = event.dict()
    event_dict["created_at"] = datetime.now()
    event_dict["updated_at"] = datetime.now()
    
    result = await db.events.insert_one(event_dict)
    event_dict["_id"] = str(result.inserted_id)
    
    return Event(**event_dict)

@app.get("/api/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    event = await db.events.find_one({"_id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.put("/api/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event_update: EventCreate):
    event_dict = event_update.dict()
    event_dict["updated_at"] = datetime.now()
    
    result = await db.events.update_one(
        {"_id": event_id},
        {"$set": event_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
        
    updated_event = await db.events.find_one({"_id": event_id})
    return updated_event

@app.delete("/api/events/{event_id}")
async def delete_event(event_id: str):
    result = await db.events.delete_one({"_id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}

# Liked Events
@app.post("/api/liked-events")
async def like_event(event_id: str):
    event = await db.events.find_one({"_id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    liked_event = {
        "event_id": event_id,
        "liked_at": datetime.now()
    }
    
    await db.liked_events.insert_one(liked_event)
    return {"message": "Event liked successfully"}

@app.get("/api/liked-events", response_model=List[Event])
async def get_liked_events(
    limit: int = Query(10, gt=0),
    page: int = Query(1, gt=0)
):
    skip = (page - 1) * limit
    
    # Get liked event IDs
    liked_events = await db.liked_events.find().skip(skip).limit(limit).to_list(length=limit)
    event_ids = [le["event_id"] for le in liked_events]
    
    # Get full event details
    events = await db.events.find({"_id": {"$in": event_ids}}).to_list(length=limit)
    return events

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
