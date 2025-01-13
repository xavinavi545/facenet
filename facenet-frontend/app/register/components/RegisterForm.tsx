"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Loading from "../../components/Loading";


export default function RegisterForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = useCallback(async (file: File) => {
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name); // Campo de texto para el nombre
    formData.append("file", file); // Archivo capturado desde la cámara

    try {
      const res = await fetch("http://localhost:8000/register/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.status === "success" ? "Registro exitoso" : data.error);
    } catch (err) {
      console.error("Error en el registro:", err);
      setMessage("Error al conectar con el backend.");
    } finally {
      setIsLoading(false);
      setIsCameraOpen(false);
    }
  }, [name]);

  const captureFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convertir el canvas a un archivo Blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });

            // Enviar el archivo al backend
            await handleSubmit(file);
          }
        }, "image/jpeg");
      }
    }
  }, [canvasRef, videoRef, handleSubmit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && isCameraOpen) {
        e.preventDefault();
        captureFrame();
      }
      if (e.code === "KeyQ" && isCameraOpen) {
        e.preventDefault();
        setIsCameraOpen(false); // Cierra la cámara
        setMessage("Acción cancelada.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [captureFrame, isCameraOpen]);

  const openCamera = async () => {
    setIsCameraOpen(true);
    setMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      setMessage("No se pudo acceder a la cámara.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openCamera();
            }}
            className="flex flex-col items-center"
          >
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 mb-4"
              required
            />
            {!isCameraOpen && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Abrir Cámara
              </button>
            )}
          </form>
          {isCameraOpen && (
            <div>
              <video
                ref={videoRef}
                autoPlay
                className="mb-4 w-64 h-48 border"
              ></video>
              <canvas ref={canvasRef} className="hidden" width={640} height={480} />
              <p className="text-center">
                Presiona <span className="font-bold">Espacio</span> para capturar la
                imagen o <span className="font-bold">Q</span> para cancelar.
              </p>
            </div>
          )}
          {message && (
            <dialog
              open
              className="bg-white p-6 rounded shadow-lg border border-gray-300"
            >
              <p>{message}</p>
              <button
                onClick={() => setMessage("")}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cerrar
              </button>
            </dialog>
          )}
        </>
      )}
    </div>
  );
}
