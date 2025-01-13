import asyncio
import json
from datetime import datetime
from scrapers.washington_org import WashingtonOrgScraper
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

async def main():
    try:
        logger.info("Starting Washington.org scraper test")
        
        # Initialize scraper
        scraper = WashingtonOrgScraper()
        
        # Get events
        logger.info("Fetching events...")
        events = await scraper.get_events()
        
        # Print results
        logger.info(f"Found {len(events)} events")
        
        # Save to file for inspection
        with open('scraped_events.json', 'w') as f:
            json.dump(events, f, indent=2, cls=DateTimeEncoder)
        logger.info("Saved events to scraped_events.json")
        
        # Print sample of first event
        if events:
            logger.info("\nSample Event Details:")
            event = events[0]
            print("\n=== First Event ===")
            print(f"Title: {event['title']}")
            print(f"Date: {event['date']}")
            print(f"Location: {event['location']['name']}")
            if event['location']['address']:
                print(f"Address: {event['location']['address']['full']}")
            if event['location']['coordinates']:
                print(f"Coordinates: {event['location']['coordinates']}")
            print(f"Description: {event['description'][:200]}...")
            print(f"Source URL: {event['source_url']}")
            print("=================")
        
    except Exception as e:
        logger.error(f"Error in main: {e}", exc_info=True)

if __name__ == "__main__":
    asyncio.run(main()) 