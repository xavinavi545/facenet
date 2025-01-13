import psycopg2
from dotenv import load_dotenv
import os

# Cargar variables del entorno desde .env
load_dotenv()

try:
    # Conexión a la base de datos
    connection = psycopg2.connect(os.getenv("DATABASE_URL"))
    print("Conexión exitosa a la base de datos 'facenet_db'")
    
    # Ejecutar una consulta de prueba
    cursor = connection.cursor()
    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cursor.fetchall()
    print("Tablas existentes:", tables)
    
    cursor.close()
    connection.close()

except Exception as e:
    print(f"Error al conectar a la base de datos: {e}")