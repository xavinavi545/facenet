"use client";

import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import { IoArrowBackSharp } from "react-icons/io5";

export default function RegisterPage() {
  const [isClosed, setIsClosed] = useState(false);

  const toogleClose = () => {
    setIsClosed(true);
    window.history.back();
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
        <h1 className="text-black text-3xl font-medium">Registrar una Rostro</h1>
        </div>
        <div className="items-center justify-center">
          <RegisterForm isClosed={isClosed} />
        </div>
      </div>
    </>
  );
}
