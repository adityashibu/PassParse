from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import PassportData
from app.services.ollama_client import extract_passport_data
from app.services.excel_writer import append_to_excel

router = APIRouter()


@router.post("/extract-passport", response_model=PassportData)
async def extract_passport(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await file.read()
    passport_data = await extract_passport_data(image_bytes)
    return passport_data


@router.post("/save-to-excel")
async def save_to_excel(data: PassportData):
    append_to_excel(data)
    return {"status": "saved"}
