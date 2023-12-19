import React from "react";
import BaseButton from "../components/BaseButton";
import { useNavigate, Link } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-xl  m-4 p-10 border">
        <h1 className="text-3xl">
          No estás autorizado a acceder a esta página
        </h1>
        <p className="text-2xl">Lo sentimos</p>
        <br/>
        <BaseButton className='bg-primary ' btnText="Volver atrás" onClick={goBack} />
      </div>
    </div>
  );
}

export default Unauthorized;
