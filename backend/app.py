from fastapi import FastAPI
from backend.routes import register, verify

app = FastAPI()

# Incluir las rutas
app.include_router(register.router, prefix="/register", tags=["register"])
app.include_router(verify.router, prefix="/verify", tags=["verify"])
