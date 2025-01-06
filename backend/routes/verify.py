from fastapi import APIRouter, UploadFile, Depends
from backend.models.facenet import verify_face
from backend.database.profiles import get_db

router = APIRouter()

@router.post("/")
async def verify(file: UploadFile, db=Depends(get_db)):
    image = await file.read()
    return verify_face(image, db)
