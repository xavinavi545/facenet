"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Facenet</h1>
        <p className="mb-8 text-lg text-gray-600">
          Registra o verifica rostros con nuestra aplicación.
        </p>
        <div className="flex gap-8">
          <button
            onClick={() => router.push("/register")}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Registrar Rostro
          </button>
          <button
            onClick={() => router.push("/verify")}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Verificar Rostro
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
