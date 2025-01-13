"use client";

import VerifyForm from "./components/VerifyForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Verificación de Rostros</h1>
        <VerifyForm />
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Regresar
        </button>
      </div>
      <Footer />
    </>
  );
}
