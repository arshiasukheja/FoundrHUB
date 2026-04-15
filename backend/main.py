from datetime import date
import random
from fastapi import FastAPI

app = FastAPI()

# In-memory store (swap with Firebase/Firestore later)
data_store = []

@app.get("/data")
def get_all_data():
    return data_store

@app.get("/data/{selected_date}")
def get_data_by_date(selected_date: str):
    for entry in data_store:
        if entry["date"] == selected_date:
            return entry
    return {"message": "No data"}

@app.post("/generate")
def generate_data():
    today = str(date.today())
    entry = {
        "date": today,
        "activeUsers": random.randint(500, 2000),
        "profileViews": random.randint(200, 1000),
        "aiActions": random.randint(100, 500),
        "investorInteractions": random.randint(50, 300)
    }
    data_store.append(entry)
    return entry
