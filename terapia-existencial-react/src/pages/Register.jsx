import React, { useState } from "react";
import BaseButton from "../components/BaseButton";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, login } from "../api/user";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccount(email, password);
      const loggedUser = await login(email, password);
      localStorage.setItem("token", loggedUser.token);
      navigate("/services", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="max-h-screen">
        <div className="flex flex-col justify-center items-center shadow-lg py-8 max-w-sm mx-auto my-20 rounded-lg">
          <h1 className="text-3xl font-medium p-3">Create una cuenta</h1>
          <div className="form-container">
            <form action="#" className="form" onSubmit={handleFormSubmit}>
              <div className="flex flex-col my-5">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleEmailChange}
                  email={email}
                  required
                  className="border border-solid border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="flex flex-col my-5">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                  required
                  className="border border-solid border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="my-5">
                <BaseButton
                  className="w-full bg-primary "
                  type="submit"
                  btnText="Iniciar Sesión"
                />
                <div className="mt-3">
                  <p>
                    ¿Ya tenés cuenta? <Link to="/login" className="text-primary">
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
