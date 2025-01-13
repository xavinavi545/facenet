from app.models.profile import Profile
import numpy as np

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
