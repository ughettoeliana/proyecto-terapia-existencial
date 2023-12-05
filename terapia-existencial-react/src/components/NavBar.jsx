import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseNavLi from "./BaseNavLi";
import { logout } from "../api/user.js";

const NavBar = () => {
  //const [user, setUser] = useState({ id: null, email: null, rol: null });
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedUser(!!authToken);
  }, [authToken]);

  
  const handleLogout = async () => {
    try {
      await logout(authToken);
      setIsLoggedUser(false);
      localStorage.removeItem("token");
      navigate("/iniciar-sesion", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <nav className="flex flex-row justify-around items-center">
        <div className="flex flex-row justify-start">
          <div className="px-2 text-xl">
            <img src="/logo.svg" alt="Logo" width="30" height="24" />
          </div>
          <Link to="/" className="text-lg">
            Consultoría Psicológica
          </Link>
        </div>

        <ul className="flex flex-row justify-around items-center p-4">
          <div className="flex flex-row justify-center items-center">
            <BaseNavLi>
              <Link to="/about" className="text-gray-500">
                Acerca de nosotros
              </Link>
            </BaseNavLi>
          </div>
          {isLoggedUser && isLoggedUser.rol && (
            <>
              {isLoggedUser.rol === "admin" && (
                <BaseNavLi>
                  <Link to="/panel" className="text-gray-500">
                    Panel Administrador
                  </Link>
                </BaseNavLi>
              )}
              {isLoggedUser.rol === "user" && (
                <BaseNavLi>
                  <Link to="/perfil" className="text-gray-500">
                    Mi Perfil
                  </Link>
                </BaseNavLi>
              )}
            </>
          )}

          {!isLoggedUser ? (
            <>
              <BaseNavLi>
                <Link
                  to="/iniciar-sesion"
                  className="text-darkBlue font-medium bg-lightBlue p-2 rounded-lg border border-solid border-lightBlue hover:border-primary"
                >
                  Iniciar sesión
                </Link>
              </BaseNavLi>
              <BaseNavLi>
                <Link
                  to="/registro"
                  className="text-darkBlue font-medium p-2 rounded-lg bg-lighterBlue hover:bg-lightBlue"
                >
                  Registro
                </Link>
              </BaseNavLi>
            </>
          ) : (
            <>
              <BaseNavLi>
                <Link to="/servicios" className="text-gray-500">
                  Servicios
                </Link>
              </BaseNavLi>
              <BaseNavLi>
                <button
                  onClick={handleLogout}
                  className="text-white bg-black p-2 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </BaseNavLi>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
