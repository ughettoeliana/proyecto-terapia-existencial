import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import BaseButton from "../components/BaseButton";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserById, updateUser } from "../api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAppoinmentByUserId } from "../api/appoinment";
import { getServiceDetails, getServices } from "../api/service";

async function Appoinments({ user }) {
  const [appoinmentsLoading, setAppoinmentsLoading] = useState(true);
  const [appoinments, setAppoinments] = useState([]);
  const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    const fetchAppoinmentData = async () => {
      try {
        if (!user || !user.id) {
          setAppoinmentsLoading(false);

          return;
        }

        const foundAppoinments = await getAppoinmentByUserId(user.id);
        console.log("foundAppoinments", foundAppoinments);
        setAppoinments([
          {
            serviceId: foundAppoinments.serviceId,
            userId: foundAppoinments.userId,
            appoinment: {
              date: foundAppoinments.date,
              time: foundAppoinments.time,
            },
          },
        ]);

        setAppoinmentsLoading(false);
      } catch (error) {
        console.error(error);
        setAppoinmentsLoading(false);
      }
    };

    fetchAppoinmentData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServiceDetails(serviceId);
        setAppoinments({
          name: data.name,
          time: data.time,
          price: data.price,
          modality: data.modality,
        });
      } catch (error) {
        console.error("Error in useEffect for fetching services:", error);
        setAppoinmentsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("appoinments", appoinments);

  return (
    <div>
      {appoinmentsLoading && <Loader />}
      {!appoinmentsLoading && (
        <div>
          {appoinments.map((appoinment) => (
            <div
              key={appoinment.id}
              className="p-5 flex flex-col rounded-xl border border-solid border-slate-200"
            >
              <div>
                <h2 className="text-darkBlue text-xl font-semibold">
                  {appoinment.name}
                </h2>
                <p>
                  <i
                    className="fa-solid fa-clock"
                    style={{ color: "#21496b" }}
                  ></i>
                  {appoinment.time}
                </p>
                <p>$ {appoinment.price}</p>
                <p>
                  Fecha:
                  <span className="font-semibold">
                    {appoinment.appointment.date}
                  </span>
                </p>
                <p>
                  Hora:
                  <span className="font-semibold">
                    {appoinment.appointment.time}
                  </span>
                </p>
                <p className="py-2">
                  Agendaste una sesión con el consultor Daniel del Valle
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    rol: "",
    fullName: "",
    bio: "",
  });
  const [editedUser, setEditedUser] = useState({ fullName: "", bio: "" });
  const [userLoading, setUserLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [appoinmentsLoading, setAppoinmentsLoading] = useState(true);
  const [appoinments, setAppoinments] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  async function fetchUserData(userId) {
    try {
      const userData = await getUserById(userId);
      return userData.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  const fetchData = async () => {
    setUserLoading(true);
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      return <Navigate to={"/login"} replace={true} />;
    }

    const tokenData = jwtDecode(authToken);

    try {
      const userData = await fetchUserData(tokenData.userId);
      console.log("userData", userData);
      if (userData) {
        setUser({
          id: userData._id,
          email: userData.email,
          rol: userData.rol,
          fullName: userData.fullName,
          bio: userData.bio,
        });
        setUserLoading(false);
      } else {
        console.error("User data is undefined");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleUpdateUser() {
    const userId = user.id;
    try {
      const updatedUserData = await updateUser(editedUser, userId);
      console.log("updatedUserData", updatedUserData);
      setUser({
        ...user,
        fullName: updatedUserData.fullName,
        bio: updatedUserData.bio,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  function toggleEditMode() {
    setEditMode(true);
    setEditedUser({
      fullName: user.fullName || "",
      bio: user.bio || "",
    });
  }

  useEffect(() => {
    const fetchAppoinmentData = async () => {
      try {
        if (!user || !user.id) {
          setAppoinmentsLoading(false);
          return;
        }
        const foundAppoinments = await getAppoinmentByUserId(user.id);
        setAppoinments(foundAppoinments);
        setAppoinmentsLoading(false);
      } catch (error) {
        console.error(error);
        setAppoinmentsLoading(false);
      }
    };

    fetchAppoinmentData();
  }, [user]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceDataPromises = appoinments.map(async (appointment) => {
          if (appointment.serviceId) {
            return await getServiceDetails(appointment.serviceId);
          }
          return null;
        });

        const serviceData = await Promise.all(serviceDataPromises);
        setServiceData(serviceData);
      } catch (error) {
        console.error("Error in useEffect for fetching services:", error);
        setAppoinmentsLoading(false);
      }
    };

    fetchServiceData();
  }, [appoinments]);

  console.log("user", user);
  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row justify-center my-5 py-5 min-h-screen">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl py-3">
              Mi perfil
              <FontAwesomeIcon
                icon={faUser}
                className="mx-2 my-profile-icon"
                style={{ color: "#21496b" }}
              />
            </h1>
            <div>
              <div className="py-2">
                {user.fullName && (
                  <p className="py-2">
                    Nombre:
                    <span className="font-semibold"> {user.fullName}</span>
                  </p>
                )}
                {user.bio && (
                  <p className="py-2">
                    Biografía:
                    <span className="font-semibold"> {user.bio}</span>
                  </p>
                )}
              </div>
              <div className="main-user-info">
                <p className="py-2">
                  Mail:
                  <span className="">
                    <span className="font-semibold"> {user.email}</span>
                  </span>
                </p>
              </div>
            </div>
            {!editMode && (
              <BaseButton
                className="px-10 my-2"
                onClick={toggleEditMode}
                btnText="Editar mi perfil"
              />
            )}
            {editMode && (
              <div className="flex flex-col">
                <form onSubmit={handleUpdateUser} className="my-5">
                  <div className="flex flex-col">
                    <label htmlFor="fullName">Nombre Completo</label>
                    <input
                      className="border border-solid border-gray-300 rounded-md p-1"
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
                  <div className="my-5 flex flex-col">
                    <label htmlFor="bio">Biografía</label>
                    <textarea
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
                      className="border border-solid border-gray-300 rounded-md p-1"
                    />
                  </div>
                  <div className="flex justify-around items-center">
                    <BaseButton
                      editMode="false"
                      type="submit"
                      className="bg-slate-400 mb-3 px-5"
                      btnText="Cerrar"
                    />
                    <BaseButton
                      btnText="Guardar"
                      className="mb-3 px-5"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* {user.id && <Appoinments user={user} />} */}
          <div className="mx-4">
            {appoinmentsLoading && <Loader />}
            {!appoinmentsLoading && (
              <div>
                {appoinments.map((appoinment) => (
                  <div
                    key={appoinment._id}
                    className="p-5 flex flex-col rounded-xl border border-solid border-slate-200"
                  >
                    <div>
                      {serviceData.map((service) => (
                        <div key={service._id}>
                          <h2 className="text-darkBlue text-xl font-semibold">
                            {service.name}
                          </h2>
                          <p>
                            <i
                              className="fa-solid fa-clock"
                              style={{ color: "#21496b" }}
                            ></i>
                            {service.time}
                          </p>
                          <p>$ {service.price}</p>
                        </div>
                      ))}

                      <p>
                        Fecha:
                        <span className="font-semibold">
                          {appoinment.appoinmentData.date}
                        </span>
                      </p>
                      <p>
                        Hora:
                        <span className="font-semibold">
                          {appoinment.appoinmentData.time}
                        </span>
                      </p>
                      <p className="py-2">
                        Agendaste una sesión con el consultor Daniel del Valle
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

{
  /*<div>
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
                      {hiredService.appointment.time}
                    </span>
                  </p>
                  <p className="py-2">
                    Agendaste una sesión con el consultor Daniel del Valle
                  </p>
                </div>
              </div>
            ))}
          </div> */
}
