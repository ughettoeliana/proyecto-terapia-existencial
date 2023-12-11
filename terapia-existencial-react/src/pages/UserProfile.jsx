import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import BaseTextarea from "../components/BaseTextarea";

const UserProfile = () => {

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row justify-center my-5 py-5 min-h-screen">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl py-3">
              Mi perfil
              <i
                className="fa-solid fa-user mx-2 my-profile-icon"
                style={{ color: "#21496b" }}
              ></i>
            </h1>
            <div>
              <div className="py-2">
                {loggedUser.fullName && (
                  <p className="py-2">
                    Nombre:
                    <span className="font-semibold">{}</span>
                  </p>
                )}
                {isLoggedUser.bio && (
                  <p className="py-2">
                    Biografía:
                    <span className="font-semibold">{}</span>
                  </p>
                )}
              </div>
              <div className="main-user-info">
                <p className="py-2">
                  Mail:
                  <span className="">
                    <span className="font-semibold">{}</span>
                  </span>
                </p>
                <p className="py-2">
                  Mi Rol:
                  <span className="">
                    <span className="font-semibold">{}</span>
                  </span>
                </p>
              </div>
            </div>
            <BaseButton
              style={{ display: !editMode ? "block" : "none" }}
              className="px-10 my-2"
              onClick={toggleEditMode}
            >
              Editar mi perfil
            </BaseButton>
            {editMode && (
              <div className="flex flex-col">
                <form onSubmit={handleUpdateUser} className="my-5">
                  <div className="flex flex-col">
                    <label htmlFor="fullName">Nombre Completo</label>
                    <BaseInput
                      className="my-1"
                      id="fullName"
                      value={editedUser.fullName}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                  <div className="my-5">
                    <label htmlFor="bio">Biografía</label>
                    <BaseTextarea
                      id="bio"
                      value={editedUser.bio}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          bio: e.target.value,
                        })
                      }
                      placeholder="Biografía"
                      required
                      className="my-1"
                    />
                  </div>
                  <div className="flex justify-around items-center">
                    <BaseButton
                      editMode="false"
                      type="submit"
                      className="bg-slate-400 mb-3 px-5"
                    >
                      Cerrar
                    </BaseButton>
                    <BaseButton className="mb-2 px-5" type="submit">
                      Guardar
                    </BaseButton>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div>
            {hiredServices.map((hiredService) => (
              <div
                key={hiredService.id}
                className="p-5 flex flex-col rounded-xl border border-solid border-slate-200"
              >
                <div>
                  <h2 className="text-darkBlue text-xl font-semibold">
                    {hiredService.name}
                  </h2>
                  <p>
                    <i
                      className="fa-solid fa-clock"
                      style={{ color: "#21496b" }}
                    ></i>
                    {hiredService.time}
                  </p>
                  <p>$ {hiredService.price}</p>
                  <p>
                    Fecha:
                    <span className="font-semibold">
                      {hiredService.appointment.date}
                    </span>
                  </p>
                  <p>
                    Hora:
                    <span className="font-semibold">
                      {hiredService.appointment.hour}
                    </span>
                  </p>
                  <p className="py-2">
                    Agendaste una sesión con el consultor Daniel del Valle
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
