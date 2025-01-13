from facenet_pytorch import InceptionResnetV1, MTCNN

# Cargar el modelo FaceNet
model = InceptionResnetV1(pretrained='vggface2').eval()

# Inicializar el detector de rostros
mtcnn = MTCNN(image_size=160)
