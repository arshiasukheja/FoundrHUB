from fastapi import Query
@app.get("/api/google-data")
def get_google_data(user_id: str = Query(...)):
    record = _ensure_integration_user(user_id)
    if not (record["ga"].get("connected") and record["ga"].get("access_token") and record["ga"].get("ga_property_id")):
        raise HTTPException(status_code=400, detail="Google Analytics not connected")
    access_token = record["ga"]["access_token"]
    property_id = record["ga"]["ga_property_id"]
    # Fetch users, sessions, pageviews
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport"
    payload = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
        "metrics": [
            {"name": "activeUsers"},
            {"name": "sessions"},
            {"name": "screenPageViews"}
        ]
    }
    response = requests.post(url, json=payload, headers={"Authorization": f"Bearer {access_token}"}, timeout=20)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Google Analytics data fetch failed")
    data = response.json()
    rows = data.get("rows", [])
    if not rows:
        return {"users": 0, "sessions": 0, "pageviews": 0}
    metrics = rows[0].get("metricValues", [])
    users = int(metrics[0]["value"]) if len(metrics) > 0 else 0
    sessions = int(metrics[1]["value"]) if len(metrics) > 1 else 0
    pageviews = int(metrics[2]["value"]) if len(metrics) > 2 else 0
    return {"users": users, "sessions": sessions, "pageviews": pageviews}
from datetime import date
import os
import random
import secrets
from typing import Dict, Optional, Tuple
from urllib.parse import urlencode
import requests
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

app = FastAPI()

# In-memory store (swap with Firebase/Firestore later)
data_store = []
integration_store: Dict[str, Dict[str, Dict]] = {}
oauth_state_store: Dict[str, Dict[str, str]] = {}

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
STRIPE_CLIENT_ID = os.getenv("STRIPE_CLIENT_ID", "")
STRIPE_CLIENT_SECRET = os.getenv("STRIPE_CLIENT_SECRET", "")
STRIPE_REDIRECT_URI = os.getenv("STRIPE_REDIRECT_URI", "http://localhost:8000/auth/stripe/callback")
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
FRONTEND_DASHBOARD_URL = os.getenv("FRONTEND_DASHBOARD_URL", "http://localhost:5173/dashboard")


class GAConnectRequest(BaseModel):
    user_id: str
    access_token: Optional[str] = None


class GASelectRequest(BaseModel):
    user_id: str
    ga_property_id: str


class PaymentsConnectRequest(BaseModel):
    user_id: str
    provider: str
    stripe_account_id: Optional[str] = None
    razorpay_key_id: Optional[str] = None
    razorpay_key_secret: Optional[str] = None


def _ensure_integration_user(user_id: str) -> Dict[str, Dict]:
    if user_id not in integration_store:
        integration_store[user_id] = {
            "ga": {
                "oauth_connected": False,
                "connected": False,
                "properties": [],
                "ga_property_id": None,
                "access_token": None
            },
            "payments": {
                "connected": False,
                "provider": None,
                "stripe_account_id": None,
                "stripe_access_token": None,
                "razorpay": None
            },
            "metrics": {"users": 0, "sessions": 0, "revenue": 0.0, "transactions": 0}
        }
    return integration_store[user_id]


def _seed_ga_metrics(user_id: str) -> None:
    record = _ensure_integration_user(user_id)
    if record["metrics"]["users"] == 0:
        record["metrics"]["users"] = random.randint(800, 3600)
        record["metrics"]["sessions"] = int(record["metrics"]["users"] * random.uniform(1.1, 1.6))


def _seed_payment_metrics(user_id: str) -> None:
    record = _ensure_integration_user(user_id)
    if record["metrics"]["transactions"] == 0:
        record["metrics"]["transactions"] = random.randint(12, 120)
        record["metrics"]["revenue"] = float(record["metrics"]["transactions"] * random.uniform(1200, 7200))


def _build_oauth_state(user_id: str, provider: str) -> str:
    token = secrets.token_urlsafe(16)
    state = f"{provider}:{token}"
    oauth_state_store[state] = {"user_id": user_id, "provider": provider}
    return state


def _consume_oauth_state(state: str, provider: str) -> str:
    data = oauth_state_store.pop(state, None)
    if not data or data.get("provider") != provider:
        raise HTTPException(status_code=400, detail="Invalid OAuth state")
    return data["user_id"]


def _fetch_ga_metrics(access_token: str, property_id: str) -> Tuple[int, int]:
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport"
    payload = {
        "dateRanges": [{"startDate": "30daysAgo", "endDate": "today"}],
        "metrics": [{"name": "activeUsers"}, {"name": "sessions"}]
    }
    response = requests.post(url, json=payload, headers={"Authorization": f"Bearer {access_token}"}, timeout=20)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Google Analytics data fetch failed")
    data = response.json()
    rows = data.get("rows", [])
    if not rows:
        return 0, 0
    metrics = rows[0].get("metricValues", [])
    users = int(metrics[0]["value"]) if len(metrics) > 0 else 0
    sessions = int(metrics[1]["value"]) if len(metrics) > 1 else 0
    return users, sessions


def _fetch_stripe_metrics(access_token: str) -> Tuple[float, int]:
    response = requests.get(
        "https://api.stripe.com/v1/charges",
        params={"limit": 100},
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=20
    )
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Stripe data fetch failed")
    data = response.json()
    charges = data.get("data", [])
    total = sum((charge.get("amount", 0) or 0) for charge in charges)
    return float(total) / 100, len(charges)


def _fetch_razorpay_metrics(key_id: str, key_secret: str) -> Tuple[float, int]:
    response = requests.get(
        "https://api.razorpay.com/v1/payments",
        params={"count": 100},
        auth=(key_id, key_secret),
        timeout=20
    )
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Razorpay data fetch failed")
    data = response.json()
    payments = data.get("items", [])
    total = sum((payment.get("amount", 0) or 0) for payment in payments)
    return float(total) / 100, len(payments)

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


@app.post("/api/integrations/ga/connect")
def connect_google_analytics(payload: GAConnectRequest):
    record = _ensure_integration_user(payload.user_id)
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google OAuth is not configured")
    state = _build_oauth_state(payload.user_id, "google")
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "https://www.googleapis.com/auth/analytics.readonly",
        "access_type": "offline",
        "prompt": "consent",
        "state": state
    }
    url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    record["ga"].update({"oauth_connected": False, "connected": False, "properties": []})
    return {"ok": True, "auth_url": url}


@app.get("/auth/google")
def start_google_oauth(user_id: str):
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google OAuth is not configured")
    _ensure_integration_user(user_id)
    state = _build_oauth_state(user_id, "google")
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "https://www.googleapis.com/auth/analytics.readonly",
        "access_type": "offline",
        "prompt": "consent",
        "state": state
    }
    url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    return RedirectResponse(url)


@app.get("/auth/google/callback")
def google_oauth_callback(code: str, state: str):
    user_id = _consume_oauth_state(state, "google")
    record = _ensure_integration_user(user_id)
    token_response = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code"
        },
        timeout=20
    )
    if token_response.status_code != 200:
        return RedirectResponse(f"{FRONTEND_DASHBOARD_URL}?connected=google&error=1")
    token_payload = token_response.json()
    access_token = token_payload.get("access_token")
    if not access_token:
        return RedirectResponse(f"{FRONTEND_DASHBOARD_URL}?connected=google&error=1")

    properties_response = requests.get(
        "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=20
    )
    properties = []
    if properties_response.status_code == 200:
        summaries = properties_response.json().get("accountSummaries", [])
        for summary in summaries:
            for prop in summary.get("propertySummaries", []):
                prop_id = prop.get("property")
                if prop_id and prop_id.startswith("properties/"):
                    prop_id = prop_id.split("/")[-1]
                properties.append({"id": prop_id, "name": prop.get("displayName", "GA Property")})

    record["ga"].update({
        "oauth_connected": True,
        "connected": False,
        "properties": properties,
        "access_token": access_token
    })
    return RedirectResponse(f"{FRONTEND_DASHBOARD_URL}?connected=google")


@app.post("/api/integrations/ga/select")
def select_ga_property(payload: GASelectRequest):
    record = _ensure_integration_user(payload.user_id)
    if not record["ga"]["oauth_connected"]:
        raise HTTPException(status_code=400, detail="Google Analytics not connected")
    record["ga"]["ga_property_id"] = payload.ga_property_id
    record["ga"]["connected"] = True
    _seed_ga_metrics(payload.user_id)
    return {"ok": True, "ga_property_id": payload.ga_property_id}


@app.get("/api/integrations/ga/properties")
def get_ga_properties(user_id: str):
    record = _ensure_integration_user(user_id)
    return {
        "ok": True,
        "oauth_connected": record["ga"]["oauth_connected"],
        "connected": record["ga"]["connected"],
        "properties": record["ga"]["properties"],
        "ga_property_id": record["ga"]["ga_property_id"]
    }


@app.post("/api/integrations/payments/connect")
def connect_payments(payload: PaymentsConnectRequest):
    record = _ensure_integration_user(payload.user_id)
    provider = payload.provider.lower().strip()
    if provider not in {"stripe", "razorpay"}:
        raise HTTPException(status_code=400, detail="Unsupported payment provider")

    if provider == "stripe":
        raise HTTPException(status_code=400, detail="Stripe must be connected via OAuth")
    else:
        if not payload.razorpay_key_id or not payload.razorpay_key_secret:
            raise HTTPException(status_code=400, detail="Razorpay keys are required")
        verify = requests.get(
            "https://api.razorpay.com/v1/payments",
            params={"count": 1},
            auth=(payload.razorpay_key_id, payload.razorpay_key_secret),
            timeout=20
        )
        if verify.status_code != 200:
            raise HTTPException(status_code=400, detail="Razorpay verification failed")
        record["payments"].update({
            "connected": True,
            "provider": "razorpay",
            "stripe_account_id": None,
            "stripe_access_token": None,
            "razorpay": {
                "key_id": payload.razorpay_key_id,
                "key_secret": payload.razorpay_key_secret
            }
        })

    _seed_payment_metrics(payload.user_id)
    return {"ok": True, "provider": record["payments"]["provider"]}


@app.get("/auth/stripe")
def start_stripe_oauth(user_id: str):
    if not STRIPE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Stripe OAuth is not configured")
    _ensure_integration_user(user_id)
    state = _build_oauth_state(user_id, "stripe")
    params = {
        "response_type": "code",
        "client_id": STRIPE_CLIENT_ID,
        "scope": "read_only",
        "redirect_uri": STRIPE_REDIRECT_URI,
        "state": state
    }
    url = f"https://connect.stripe.com/oauth/authorize?{urlencode(params)}"
    return RedirectResponse(url)


@app.get("/auth/stripe/callback")
def stripe_oauth_callback(code: str, state: str):
    user_id = _consume_oauth_state(state, "stripe")
    record = _ensure_integration_user(user_id)
    token_response = requests.post(
        "https://connect.stripe.com/oauth/token",
        data={
            "client_secret": STRIPE_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code"
        },
        timeout=20
    )
    if token_response.status_code != 200:
        return RedirectResponse(f"{FRONTEND_DASHBOARD_URL}?connected=stripe&error=1")
    payload = token_response.json()
    account_id = payload.get("stripe_user_id")
    access_token = payload.get("access_token")
    if not account_id or not access_token:
        return RedirectResponse(f"{FRONTEND_DASHBOARD_URL}?connected=stripe&error=1")

    record["payments"].update({
        "connected": True,
        "provider": "stripe",
        "stripe_account_id": account_id,
        "stripe_access_token": access_token,
        "razorpay": None
    })
    _seed_payment_metrics(user_id)
    return RedirectResponse(f"{FRONTEND_DASHBOARD_URL}?connected=stripe")


@app.get("/api/integrations/status")
def get_integrations_status(user_id: str):
    record = _ensure_integration_user(user_id)
    return {
        "ga": {
            "oauth_connected": record["ga"]["oauth_connected"],
            "connected": record["ga"]["connected"],
            "ga_property_id": record["ga"]["ga_property_id"],
            "properties": record["ga"]["properties"]
        },
        "payments": {
            "connected": record["payments"]["connected"],
            "provider": record["payments"]["provider"]
        }
    }


@app.get("/api/dashboard")
def get_dashboard(user_id: str):
    record = _ensure_integration_user(user_id)
    metrics = record["metrics"]
    users = metrics.get("users", 0)
    sessions = metrics.get("sessions", 0)
    revenue = metrics.get("revenue", 0.0)
    transactions = metrics.get("transactions", 0)

    if record["ga"]["connected"] and record["ga"]["access_token"] and record["ga"]["ga_property_id"]:
        try:
            users, sessions = _fetch_ga_metrics(record["ga"]["access_token"], record["ga"]["ga_property_id"])
            metrics["users"] = users
            metrics["sessions"] = sessions
        except HTTPException:
            pass

    if record["payments"]["connected"]:
        provider = record["payments"]["provider"]
        try:
            if provider == "stripe" and record["payments"]["stripe_access_token"]:
                revenue, transactions = _fetch_stripe_metrics(record["payments"]["stripe_access_token"])
            elif provider == "razorpay" and record["payments"]["razorpay"]:
                revenue, transactions = _fetch_razorpay_metrics(
                    record["payments"]["razorpay"]["key_id"],
                    record["payments"]["razorpay"]["key_secret"]
                )
            metrics["revenue"] = revenue
            metrics["transactions"] = transactions
        except HTTPException:
            pass

    users = users if record["ga"]["connected"] else 0
    sessions = sessions if record["ga"]["connected"] else 0
    revenue = revenue if record["payments"]["connected"] else 0.0
    transactions = transactions if record["payments"]["connected"] else 0
    conversion_rate = (transactions / users) if users else 0

    return {
        "users": users,
        "sessions": sessions,
        "revenue": revenue,
        "transactions": transactions,
        "conversionRate": conversion_rate
    }
