from fastapi import APIRouter, UploadFile, Depends, Form
from app.services.facenet_service import register_face
from app.config.database import get_db

router = APIRouter()

@router.post("/")
async def register(file: UploadFile, db=Depends(get_db), name: str = Form(...)):
    image = await file.read()
    return register_face(image, db, name)
