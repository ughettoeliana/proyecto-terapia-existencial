import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseNavLi from "./BaseNavLi";
import { getUserById, logout } from "../api/user.js";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const [user, setUser] = useState({ id: null, email: null, rol: null });
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedUser(!!authToken);
    if (authToken === undefined) {
      console.log("authToken es undefined");
    }
    if (authToken) {
      const tokenData = jwtDecode(authToken);
      if (authToken === undefined) {
        console.log("authToken es undefined");
      }

      if (tokenData && tokenData.userId) {
        setUser({
          id: tokenData.userId,
        });
      } else {
        setUser({
          id: null,
          email: null,
          rol: null,
        });
      }
    } else {
      setUser({
        id: null,
        email: null,
        rol: null,
      });
    }
  }, [authToken]);

  async function getUserData(user) {
    try {
      if (user.id) {
        const userData = await getUserById(user.id, authToken);
        setUser({
          id: userData.data._id,
          email: userData.data.email,
          rol: userData.data.rol,
        });
      } else {
        console.log("User ID is null");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isLoggedUser) {
      getUserData(user);
    }
  }, [isLoggedUser]);

  const handleLogout = async () => {
    try {
      await logout(authToken);
      setIsLoggedUser(false);
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
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
          <Link to="/home" className="text-lg">
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
          {user && user.rol && (
            <>
              {user.rol === "admin" && (
                <BaseNavLi>
                  <Link to="/panel" className="text-gray-500">
                    Panel Administrador
                  </Link>
                </BaseNavLi>
              )}
              {user.rol === "user" && (
                <BaseNavLi>
                  <Link to="/profile" className="text-gray-500">
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
                  to="/login"
                  className="text-darkBlue font-medium bg-lightBlue p-2 rounded-lg border border-solid border-lightBlue hover:border-primary"
                >
                  Iniciar sesión
                </Link>
              </BaseNavLi>
              <BaseNavLi>
                <Link
                  to="/register"
                  className="text-darkBlue font-medium p-2 rounded-lg bg-lighterBlue hover:bg-lightBlue"
                >
                  Registro
                </Link>
              </BaseNavLi>
            </>
          ) : (
            <>
              {user.id && (
                <>
                  <BaseNavLi>
                    <Link to="/services" className="text-gray-500">
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
