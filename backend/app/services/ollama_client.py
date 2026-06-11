import base64
import json
import httpx
from app.core.config import settings
from app.models.schemas import PassportData

PROMPT = """You are a passport data extraction assistant. Extract all fields from this passport image and return ONLY valid JSON with exactly these keys:
{
  "surname": "",
  "given_names": "",
  "nationality": "",
  "date_of_birth": "DD MMM YYYY",
  "sex": "",
  "place_of_birth": "",
  "date_of_issue": "DD MMM YYYY",
  "date_of_expiry": "DD MMM YYYY",
  "passport_number": "",
  "mrz_line1": "",
  "mrz_line2": ""
}
Return only the JSON object. No explanation, no markdown."""


async def extract_passport_data(image_bytes: bytes) -> PassportData:
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")

    payload = {
        "model": settings.ollama_model,
        "prompt": PROMPT,
        "images": [image_b64],
        "stream": False,
        "format": "json",
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(f"{settings.ollama_host}/api/generate", json=payload)
        response.raise_for_status()

    result = response.json()
    raw_text = result.get("response", "")
    data = json.loads(raw_text)
    return PassportData(**data)
