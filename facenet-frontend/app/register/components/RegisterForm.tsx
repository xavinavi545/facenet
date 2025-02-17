"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Loading from "../../components/Loading";

interface RegisterProps {
  isClosed: boolean;
}

export default function RegisterForm({ 
  isClosed,
}: RegisterProps) {
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

  const closeCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && isCameraOpen) {
        e.preventDefault();
        captureFrame();
      }
      if (e.code === "KeyQ" && isCameraOpen) {
        e.preventDefault();
        setIsCameraOpen(false); // Cierra la cámara
        closeCamera();
        setMessage("Acción cancelada.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [captureFrame, isCameraOpen]);

  useEffect(() => {
    if (isClosed) {
      closeCamera();
    }
  }, [isClosed]);

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
            {!isCameraOpen && (
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded border hover:bg-stone-100 hover:text-black  hover:border-black"
              >
                Abrir Cámara
              </button>
            )}
          </form>
          {isCameraOpen && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded border border-gray-500 p-2 mb-10 text-gray-700 w-80" /><div className="flex flex-col items-center gap-8">
              <video
                ref={videoRef}
                autoPlay
                className="mt-8 w-auto h-48 rounded border-2 border-black"
              >
              
              </video>
              <canvas ref={canvasRef} className="hidden" width={640} height={480} />
              <div className="flex flex-col gap-2">
                <p className="text-black text-center">
                  Presiona <span className="font-bold">Espacio</span> para capturar la
                  imagen
                </p>
                <p className="text-black text-center">
                  Presiona <span className="font-bold">Q</span> para cancelar.
                </p>
              </div>
            </div>
            </>
          )}
          {message && (
            <dialog
              open
              className="bg-white p-6 rounded shadow-lg border border-gray-300"
            >
              <div className="flex flex-col justify-center items-center">
                <p>{message}</p>
                <button
                  onClick={
                    () => {
                      closeCamera();
                      setMessage("");
                    }
                  }
                  className="mt-4 bg-black text-white px-4 py-2  rounded border hover:bg-stone-100 hover:text-black  hover:border-black"
                >
                  Cerrar
                </button>
              </div>
            </dialog>
          )}
        </>
      )}
    </div>
  );
}
