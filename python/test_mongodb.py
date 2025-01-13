from pymongo import MongoClient
from datetime import datetime
import logging
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_mongodb_connection():
    try:
        # Connect to MongoDB with authentication
        mongodb_uri = os.getenv('MONGODB_URI', 'mongodb://root:example@localhost:27017/')
        client = MongoClient(mongodb_uri)
        
        # Select database and collection
        db = client.test_db
        collection = db.test_collection
        
        # Create a test document
        test_doc = {
            "name": "Test Document",
            "timestamp": datetime.utcnow(),
            "test_value": "Hello MongoDB!"
        }
        
        # Insert the document
        result = collection.insert_one(test_doc)
        logger.info(f"Inserted document with ID: {result.inserted_id}")
        
        # Verify the insertion by retrieving the document
        retrieved_doc = collection.find_one({"_id": result.inserted_id})
        logger.info(f"Retrieved document: {retrieved_doc}")
        
        # Clean up - delete the test document
        collection.delete_one({"_id": result.inserted_id})
        logger.info("Test document deleted successfully")
        
        # Close the connection
        client.close()
        logger.info("MongoDB connection test completed successfully")
        
    except Exception as e:
        logger.error(f"Error testing MongoDB connection: {e}", exc_info=True)
        raise

if __name__ == "__main__":
    test_mongodb_connection()
