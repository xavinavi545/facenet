from fastapi import APIRouter, UploadFile, Depends
from app.services.facenet_service import verify_face
from app.config.database import get_db

router = APIRouter()

@router.post("/")
async def verify(file: UploadFile, db=Depends(get_db)):
    image = await file.read()
    return verify_face(image, db)
