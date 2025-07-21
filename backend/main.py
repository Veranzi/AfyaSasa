from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
import genai
from fastapi.responses import JSONResponse
import gspread
from google.oauth2.service_account import Credentials
import base64
from datetime import datetime
import json
import os
from twilio.rest import Client
from google.cloud import firestore

load_dotenv()

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")

# M-PESA credentials
MPESA_CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY", "your_consumer_key")
MPESA_CONSUMER_SECRET = os.getenv("MPESA_CONSUMER_SECRET", "your_consumer_secret")
MPESA_PASSKEY = os.getenv("MPESA_PASSKEY", "your_passkey")
MPESA_SHORTCODE = os.getenv("MPESA_SHORTCODE", "174379")  # Your Safaricom shortcode
MPESA_ENV = os.getenv("MPESA_ENV", "sandbox")  # or "production"

# M-PESA URLs
if MPESA_ENV == "sandbox":
    ACCESS_TOKEN_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    STK_PUSH_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
else:
    ACCESS_TOKEN_URL = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    STK_PUSH_URL = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "AC7125dd88cb040a6736db2d0eb32fb535")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "c535e12eb2715675a7e2171a928c6e08")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER", "+254740875071")

def get_mpesa_access_token():
    try:
        auth = base64.b64encode(f"{MPESA_CONSUMER_KEY}:{MPESA_CONSUMER_SECRET}".encode()).decode()
        headers = {"Authorization": f"Basic {auth}"}
        response = requests.get(ACCESS_TOKEN_URL, headers=headers)
        if response.ok:
            return response.json().get("access_token")
        return None
    except Exception as e:
        print(f"Error getting access token: {e}")
        return None

def generate_password():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    password_str = f"{MPESA_SHORTCODE}{MPESA_PASSKEY}{timestamp}"
    return base64.b64encode(password_str.encode()).decode()

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message")
    payload = {
        "contents": [{"parts": [{"text": user_message}]}]
    }
    response = requests.post(
        f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
        json=payload
    )
    return response.json()

@app.post("/api/llm-recommendation")
async def llm_recommendation(request: Request):
    data = await request.json()
    context = data.get("context")  # e.g., inventory, prices, patient info, etc.
    question = data.get("question")  # e.g., "What are your recommendations?"

    prompt = f"Based on the following data:\n{context}\n\nQuestion: {question}"

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        return {"recommendation": response.text}
    except Exception as e:
        return JSONResponse(status_code=500, content={"recommendation": f"Error: {str(e)}"})

@app.post("/api/inventory/add")
async def add_inventory_item(request: Request):
    data = await request.json()
    # Path to your service account key file
    SERVICE_ACCOUNT_FILE = "service_account.json"  # Place this file in your backend/ directory
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
    SPREADSHEET_ID = "120UNDtWijskCdvZmrCGPTzMHNrk-Yl6-"  # Inventory Google Sheet ID

    creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    gc = gspread.authorize(creds)
    sh = gc.open_by_key(SPREADSHEET_ID)
    worksheet = sh.sheet1  # or use .worksheet('SheetName') if not the first sheet

    # Prepare the row in the correct order
    row = [
        data.get("Facility", ""),
        data.get("Region", ""),
        data.get("Category", ""),
        data.get("Item", ""),
        data.get("Cost", ""),
        data.get("Stock", "")
    ]
    worksheet.append_row(row)
    return {"status": "success"}

@app.post("/api/payments/stk-push")
async def stk_push(request: Request):
    # Simulate payment success for demo/testing
    return {
        "success": True,
        "CheckoutRequestID": "SIMULATED123456",
        "ResponseCode": "0",
        "CustomerMessage": "Simulated payment successful"
    } 