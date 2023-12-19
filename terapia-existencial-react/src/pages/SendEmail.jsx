import React from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../components/BaseButton";

function SendEmail() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-xl  m-4 p-10 border border-primary">
        <h1 className="text-3xl">Ya te enviamos el mail</h1>
        <p className="text-2xl">
          Hace click en el link que te enviamos para continuar
        </p>
        <BaseButton className='bg-primary ' btnText='Volver atrás' onClick={goBack} />
        <br />
      </div>
    </div>
  );
}

export default SendEmail;
