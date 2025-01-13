import asyncio
import json
from datetime import datetime
import logging
from scrapers.washington_org import AIEventScraper
from rich.console import Console
from rich.table import Table
from rich import print as rprint
import os
from pymongo import MongoClient
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def main():
    try:
        # Initialize scraper
        scraper = AIEventScraper()
        
        # Test URLs
        test_urls = [
            "https://washington.org/find-dc-listings/woodrow-wilson-house"

            # Add more URLs to test
        ]
        
        # Scrape each URL
        results = []
        for url in test_urls:
            logger.info(f"\nProcessing URL: {url}")
            event_info = await scraper.scrape_event(url)
            
            if event_info:
                results.append(event_info)
                
                # Print summary
                print(f"\n=== Event Summary ===")
                print(f"Title: {event_info.get('title', 'N/A')}")
                print(f"Date: {event_info.get('date', 'N/A')}")
                if event_info.get('description'):
                    print(f"Description: {event_info['description'][:200]}...")
                if event_info.get('location'):
                    print(f"Location: {event_info['location']}")
                if event_info.get('admission'):
                    print(f"Admission: {event_info['admission']}")
                print("===================")


        # Connect to MongoDB
        client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://root:example@localhost:27017/'))
        db = client.events_db
        collection = db.ai_scraped_events

        # Insert results into MongoDB
        for event in results:
            # Add timestamp if not present
            if 'scraped_at' not in event:
                event['scraped_at'] = datetime.utcnow().isoformat()
            
            # Upsert based on title and source_url to avoid duplicates
            collection.update_one(
                {
                    'title': event['title'],
                    'source_url': event['source_url']
                },
                {'$set': event},
                upsert=True
            )
        
        logger.info(f"Successfully inserted/updated {len(results)} events in MongoDB")
        client.close()
        
    except Exception as e:
        logger.error(f"Error in main: {e}", exc_info=True)

if __name__ == "__main__":
    asyncio.run(main()) 