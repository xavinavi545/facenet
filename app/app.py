from fastapi import FastAPI, APIRouter
from app.routes import register, verify

app = FastAPI()

router = APIRouter()

# Incluir las rutas
app.include_router(register.router, prefix="/register", tags=["register"])
app.include_router(verify.router, prefix="/verify", tags=["verify"])


@router.get("/")
def hello():
    return {"message": "Server is running..."}

# Incluir el router en la aplicación principal
app.include_router(router)



# Iniciar la aplicación
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
