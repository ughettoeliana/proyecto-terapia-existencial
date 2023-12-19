import React, { useState } from "react";
import BaseButton from "../components/BaseButton";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/user";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState();
  const { id, token } = useParams();
  const navigate = useNavigate();

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function validatePassword() {
    if (password === confirmPassword) {
      return password;
    } else {
      setNotification({
        message: "Las contraseñas no coinciden",
        type: "error",
      });
      return null;
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const validPassword = validatePassword();
      if (!validPassword) {
        return;
      }
      const oldUser = await resetPassword(validPassword, id, token);
      console.log("oldUser", oldUser);
      if (oldUser.msg === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error in forgotPassword fetch:", error);
      navigate("/not-found", { replace: true });
    }
  }

  return (
    <div>
      <div className="max-h-screen">
        <div className="flex flex-col justify-center items-center shadow-lg py-8 max-w-sm mx-auto my-20 rounded-lg">
          <h1 className="text-3xl font-medium p-3">Cambiar Contraseña</h1>
          <div className="form-container">
            <form action="#" className="form" onSubmit={handleFormSubmit}>
              <div className="flex flex-col my-5">
                <label htmlFor="password">Nueva Contraseña</label>
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
              <div className="flex flex-col my-5">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  required
                  className="border border-solid border-gray-300 rounded-md p-1"
                />
              </div>
              {notification && (
                <div
                  className={`p-2 rounded max-w-md${
                    notification.message !== null
                      ? notification.type === "success"
                        ? " bg-green-200 rounded-xl"
                        : " bg-red-200 rounded-xl"
                      : ""
                  }`}
                >
                  <p
                    className={`${
                      notification.message !== null
                        ? notification.message === "success"
                          ? "text-green-500 "
                          : "text-red-500"
                        : ""
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
              )}
              <div className="my-5">
                <BaseButton
                  className="w-full"
                  type="submit"
                  btnText="Cambiar Contraseña"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
