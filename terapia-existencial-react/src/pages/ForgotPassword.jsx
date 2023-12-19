import React, { useEffect, useState } from "react";
import BaseButton from "../components/BaseButton";
import { forgotPassword, resetPassword } from "../api/user";
import { useLocation, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate()
 
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }



  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const oldUser = await forgotPassword(email);
      console.log("oldUser", oldUser);
      if(oldUser.msg === "success") {
        navigate('/send-email')
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
          <h1 className="text-3xl font-medium p-3">Recuperar contraseña</h1>
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
              <div className="my-5">
                <BaseButton
                  className="w-full bg-primary "
                  type="submit"
                  btnText="Continuar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;


