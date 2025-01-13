from sqlalchemy import Column, String, LargeBinary, Integer
from app.config.database import Base, engine

# Modelo de la tabla profiles
class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    embedding = Column(LargeBinary, nullable=False)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)
