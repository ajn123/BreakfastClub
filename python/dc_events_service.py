from flask import Flask, request, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

# In-memory storage (replace with database in production)
events = []

@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

@app.route('/events', methods=['POST'])
def add_event():
    event = request.json
    events.append(event)
    return jsonify({"message": "Event added successfully", "event": event}), 201

@app.route('/events/dc', methods=['GET'])
def fetch_dc_events():
    # You can integrate with various APIs here (Eventbrite, Meetup, etc.)
    # This is a placeholder implementation
    return jsonify(events)

if __name__ == '__main__':
    app.run(port=5000)