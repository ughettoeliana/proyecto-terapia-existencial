import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import BaseButton from "../components/BaseButton";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserById, updateUser } from "../api/user";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  deleteAppointment,
  getAppointmentByUserId,
} from "../api/appointment.js";
import { getServiceDetails } from "../api/service";

// Appointments component
function Appointments({ user }) {
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  const fetchData = async () => {
    try {
      if (!user || !user.id) {
        setAppointmentsLoading(false);
        return;
      }

      const foundAppointments = await getAppointmentByUserId(user.id);

      const appointmentsWithServiceData = await Promise.all(
        foundAppointments.map(async (appointment) => {
          if (appointment.serviceId) {
            const serviceData = await getServiceDetails(appointment.serviceId);
            return {
              id: appointment._id,
              userId: appointment.userId,
              date: appointment.appointmentData.date,
              time: appointment.appointmentData.time,
              name: serviceData.name,
              duration: serviceData.time,
              price: serviceData.price,
              modality: serviceData.modality,
              serviceId: serviceData._id,
            };
          } else {
            return null;
          }
        })
      );
      setAppointments(appointmentsWithServiceData.filter(Boolean));
      setAppointmentsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAppointmentsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  const showModal = (service) => {
    setSelectedAppointment(service);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      setDeletingAppointment(true);
      await deleteAppointment(appointmentId);
      setModalVisible(false);
      fetchData();
    } finally {
      setDeletingAppointment(false);
    }
  };
  return (
    <div className="mx-5">
      {appointmentsLoading && <Loader />}
      {!appointmentsLoading && (
        <div>
          {appointments.map((appointment) => (
            <div
              key={appointment.serviceId}
              className="p-5 flex flex-col rounded-xl border border-solid border-slate-200 m-4"
            >
              <div>
                <h2 className="text-darkBlue text-xl font-semibold">
                  {appointment.name}
                </h2>
                <p>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: "#21496b" }}
                    className="mr-1"
                  />
                  {appointment.duration}
                </p>
                <p>$ {appointment.price}</p>
                <p> {appointment.modality}</p>
                <p>
                  Fecha:
                  <span className="font-semibold">{appointment.date}</span>
                </p>
                <p>
                  Hora:
                  <span className="font-semibold">{appointment.time}</span>
                </p>
                <p className="py-3">
                  Agendaste una sesión con el consultor Daniel del Valle
                </p>
                <div className="text-right">
                  <BaseButton
                    btnText="Cancelar"
                    className="rounded-lg p-2 bg-red-500 text-white"
                    onClick={() => showModal(appointment)}
                  />
                </div>
              </div>
            </div>
          ))}
          {modalVisible && selectedAppointment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded max-w-md text-xl">
                <h2 className="">
                  Cancelar cita:
                  <span className="text-red-500 font-medium">
                    {selectedAppointment.name}
                  </span>
                </h2>
                <p className="py-3 mb-8">
                  ¿Estás seguro que quieres cancelar esta cita?
                </p>
                <p className="text-red-500 ">
                  Una vez que realices esta accion no hay vuelta atrás
                </p>
                <div className="flex justify-around items-center my-4">
                  <button
                    onClick={closeModal}
                    className="rounded-lg p-2 bg-slate-400 text-white"
                  >
                    Cerrar
                  </button>
                  <button
                    className="rounded-lg p-2 bg-red-500 text-white"
                    onClick={() =>
                      handleDeleteAppointment(selectedAppointment.id)
                    }
                  >
                    Si, eliminar
                  </button>
                </div>
                {deletingAppointment && <Loader />}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// EditUser component
function EditUser({
  user,
  handleUpdateUser,
  toggleEditMode,
  editedUser,
  setEditedUser,
}) {

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await handleUpdateUser();
  // };

  return (
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
          <BaseButton btnText="Guardar" className="mb-3 px-5" type="submit" />
        </div>
      </form>
    </div>
  );
}

// Profile component
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
              <EditUser
                user={user}
                handleUpdateUser={handleUpdateUser}
                toggleEditMode={toggleEditMode}
                editedUser={editedUser}
                setEditedUser={setEditedUser}
              />
            )}
          </div>
          {user.id && <Appointments user={user} />}
        </div>
      )}
    </>
  );
}


export default Profile;

