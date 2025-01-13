from scipy.spatial.distance import euclidean
from app.services.profile_service import save_profile, get_all_profiles
from PIL import Image
from io import BytesIO
from app.models.facenet import mtcnn, model

# Registrar rostro
def register_face(image, db, name):
    try:
        # Convertir bytes a imagen PIL
        pil_image = Image.open(BytesIO(image))

        # Detectar y alinear el rostro
        aligned_face = mtcnn(pil_image)
        if aligned_face is None:
            return {"error": "No se detectó un rostro"}

        # Generar la incrustación (embedding)
        embedding = model(aligned_face.unsqueeze(0)).squeeze().detach().numpy()

        # Guardar el perfil en la base de datos
        save_profile(db, name, embedding)
        return {"status": "success", "name": name}
    
    except Exception as e:
        return {"error": str(e)}

# Verificar rostro
def verify_face(image, db):
    try:
        # Convertir la imagen de bytes a formato PIL
        pil_image = Image.open(BytesIO(image))

        # Detectar y alinear el rostro
        aligned_face = mtcnn(pil_image)
        if aligned_face is None:
            return {"error": "No se detectó un rostro"}

        # Generar la incrustación (embedding)
        embedding = model(aligned_face.unsqueeze(0)).squeeze().detach().numpy()

        # Obtener perfiles de la base de datos
        profiles = get_all_profiles(db)
        for profile in profiles:
            print(profile.embedding.shape)
            # Comparar el embedding con los perfiles registrados
            distance = euclidean(embedding, profile.embedding)
            if distance < 0.6:  # Umbral de coincidencia
                return {"status": "success", "match": profile.name}

        return {"status": "fail", "match": None}
    
    except Exception as e:
        return {"error": str(e)}
