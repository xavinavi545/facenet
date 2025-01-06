from fastapi import APIRouter, UploadFile, Depends
from backend.models.facenet import register_face
from backend.database.profiles import get_db

router = APIRouter()

@router.post("/")
async def register(file: UploadFile, db=Depends(get_db)):
    image = await file.read()
    return register_face(image, db, name="Usuario Ejemplo")
