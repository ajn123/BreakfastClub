from bs4 import BeautifulSoup
import aiohttp
import asyncio
from datetime import datetime
from typing import List, Dict, Optional
import logging
from openai import AsyncOpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIEventScraper:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        self.client = AsyncOpenAI(
            api_key=os.getenv('OPENAI_API_KEY')
        )

    async def fetch_page(self, url: str) -> str:
        async with aiohttp.ClientSession(headers=self.headers) as session:
            try:
                async with session.get(url) as response:
                    return await response.text()
            except Exception as e:
                logger.error(f"Error fetching {url}: {e}")
                return ""

    def clean_text(self, text: str) -> str:
        """Clean and normalize text content."""
        text = ' '.join(text.split())
        text = text.replace('Accept', '').replace('Reject', '')
        return text

    def extract_text_content(self, html: str) -> str:
        """Extract meaningful text content from HTML."""
        soup = BeautifulSoup(html, 'html.parser')
        
        for element in soup.find_all(['script', 'style', 'nav', 'footer']):
            element.decompose()
        
        main_content = soup.find('main') or soup.find('article') or soup
        text = main_content.get_text(separator=' ', strip=True)
        
        return self.clean_text(text)

    async def analyze_with_ai(self, text: str) -> Dict:
        """Use OpenAI to analyze and structure event information."""
        try:
            prompt = f"""
            Analyze this text about an event or venue and extract the following information in JSON format:
            - title: The name of the event or venue
            - description: A brief description
            - date: Any mentioned dates (or "ongoing" if it's a permanent venue)
            - time: Any mentioned times
            - location: Venue name and address
            - admission: Price information
            - contact: Phone, email, or website
            - hours: Operating hours
            - additional_details: Any other important information

            Text to analyze:
            {text[:4000]}

            Return only the JSON object without any additional text.
            """

            response = await self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that extracts and structures event information."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1000
            )

            content = response.choices[0].message.content
            logger.debug(f"AI Response: {content}")
            
            try:
                # Clean up any markdown formatting
                content = content.replace("```json", "").replace("```", "").strip()
                return json.loads(content)
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {e}")
                return {}

        except Exception as e:
            logger.error(f"Error in AI analysis: {e}")
            return {}

    async def scrape_event(self, url: str) -> Optional[Dict]:
        """Scrape and analyze a single event page."""
        try:
            logger.info(f"Scraping event from: {url}")
            
            html = await self.fetch_page(url)
            if not html:
                return None
                
            text = self.extract_text_content(html)
            logger.info(f"Extracted {len(text)} characters of text")
            
            event_info = await self.analyze_with_ai(text)
            
            if event_info:
                event_info['source_url'] = url
                event_info['scraped_at'] = datetime.now().isoformat()
                
            return event_info

        except Exception as e:
            logger.error(f"Error scraping event: {e}")
            return None 