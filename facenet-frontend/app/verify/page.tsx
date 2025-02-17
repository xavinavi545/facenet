"use client";

import { useState } from "react";
import VerifyForm from "./components/VerifyForm";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [isClosed, setIsClosed] = useState(false);
  const router = useRouter();

  const toogleClose = () => {
    setIsClosed(true);
    router.push("/");
  };

  return (
    <>
          <div className="flex flex-col px-36 py-20 min-h-screen bg-gray-100">
            <div className="flex flex-row items-center justify-start mb-20 md:space-x-10 space-x-4">
              <button
                onClick={toogleClose}
                className="bg-black text-white px-4 py-2 rounded border hover:bg-stone-100 hover:text-black  hover:border-black"
              >
                <IoArrowBackSharp />
              </button>
            <h1 className="text-black text-3xl font-medium">Verificar un Rostro</h1>
            </div>
            <div className="justify-center items-center h-full">
              <VerifyForm isClosed={isClosed} />
            </div>
          </div>
        </>
  );
}
