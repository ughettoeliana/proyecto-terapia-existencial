import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="">
        <div className="flex justify-around text-lg bg-gray-100 p-10 mt-5">
          <div className="p-4">
            <h5 className="font-semibold">Diseño y Programación Web</h5>
            <p>
              <a className="text-gray-500">Profesor: Santiago Gallino</a>
            </p>
            <p>
              <a className="text-gray-500">Cliente Web Mobile</a>
            </p>
            <p>
              <a className="text-gray-500">4 Cuatrimestre</a>
            </p>
          </div>
          <div className="p-4">
            <h5 className="font-semibold">Davinci</h5>
            <p>
              <a className="text-gray-500">Turno Noche</a>
            </p>
            <p>
              <a className="text-gray-500">Comisión B</a>
            </p>
            <p>
              <a className="text-gray-500">2do Parcial</a>
            </p>
          </div>
          <div className="p-4">
            <h5 className="font-semibold">Alumna</h5>
            <p>
              <a className="text-gray-500">Eliana Ughetto</a>
            </p>
            <p>
              <a className="text-gray-500">21 años</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
