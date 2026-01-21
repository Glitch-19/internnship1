import json
import requests

url = "http://localhost:8000/api/jobs/search"
payload = {
    "query": "",
    "filters": {
        "Locations": ["Remote"],
        "Experience": [],
        "JobTypes": [],
        "Organizations": []
    }
}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
