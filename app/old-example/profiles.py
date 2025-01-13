from sqlalchemy import create_engine, Column, String, LargeBinary, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import numpy as np
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()

# Configuración de SQLAlchemy
DATABASE_URL = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Modelo de la tabla profiles
class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    embedding = Column(LargeBinary, nullable=False)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Funciones para manejar los perfiles
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def save_profile(db, name, embedding):
    profile = Profile(name=name, embedding=embedding)
    db.add(profile)
    db.commit()

def get_all_profiles(db):
    profiles = db.query(Profile).all()
    for profile in profiles:
        # Convertir de bytes a un arreglo NumPy de tipo float32
        profile.embedding = np.frombuffer(profile.embedding, dtype=np.float32)
    return profiles
