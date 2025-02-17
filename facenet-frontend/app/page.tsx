"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col items-center space-y-10 w-10/12 md:w-2/4 mb-16">
          <p className="text-3xl font-medium text-black text-center">
            Registrar rostros de manera rápida y segura
          </p>
          <p className="mb-20 text-lg px-10 text-black text-center">
            FacePod es una solución innovadora que lleva el poder de la inteligencia artificial al alcance de todos. 
            A diferencia de los sistemas tradicionales que dependen de grandes volúmenes de datos y costosos servidores, 
            FacePod se basa en Small Data, permitiendo entrenar modelos de manera rápida, eficiente y económica.
          </p>
        </div>
        <div>
          <div className="flex flex-row items-center justify-center space-x-4">
            <button
              onClick={() => router.push("/register")}
              className="bg-black text-white px-6 py-3 rounded border hover:bg-stone-100 hover:text-black hover:border-black"
            >
              Registrar Rostro
            </button>
            <button
              onClick={() => router.push("/verify")}
              className="bg-black text-white px-6 py-3 rounded border hover:bg-stone-100 hover:text-black  hover:border-black"
            >
              Verificar Rostro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
