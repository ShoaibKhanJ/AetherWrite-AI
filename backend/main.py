from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os

app = FastAPI()

# ---------------- CORS FIX ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- GEMINI SETUP ----------------
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-2.5-flash")


# ---------------- REQUEST BODY ----------------
class EssayRequest(BaseModel):
    topic: str
    length: int
    tone: str = "Academic"


# ---------------- TEST ROUTE ----------------
@app.get("/")
def home():
    return {"message": "AetherWrite AI Running"}


# ---------------- GENERATE ESSAY ----------------
@app.post("/generate")
def generate_essay(data: EssayRequest):

    try:
        prompt = f"""
Write a {data.length}-word academic essay.

Topic: {data.topic}
Tone: {data.tone}

Structure:
Introduction, Body, Conclusion
"""

        response = model.generate_content(prompt)

        return {
            "essay": response.text
        }

    except Exception as e:
        return {
            "error": str(e)
        }