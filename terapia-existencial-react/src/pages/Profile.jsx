import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import BaseButton from "../components/BaseButton";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserById, updateUser } from "../api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAppointmentByUserId } from "../api/appointment.js";
import { getServiceDetails } from "../api/service";

// Appointments component
function Appointments({ user }) {
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        if (!user || !user.id) {
          setAppointmentsLoading(false);
          return;
        }

        const foundAppointments = await getAppointmentByUserId(user.id);
        setAppointments(foundAppointments);
        setAppointmentsLoading(false);
      } catch (error) {
        console.error(error);
        setAppointmentsLoading(false);
      }
    };

    fetchAppointmentData();
  }, [user]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceDataPromises = appointments.map(async (appointment) => {
          if (appointment.serviceId) {
            return await getServiceDetails(appointment.serviceId);
          }
          return null;
        });

        const serviceData = await Promise.all(serviceDataPromises);
        setServiceData(serviceData);
      } catch (error) {
        console.error("Error in useEffect for fetching services:", error);
        setAppointmentsLoading(false);
      }
    };

    fetchServiceData();
  }, [appointments]);

  console.log("appoiments", appointments);

  return (
    <div className="mx-5">
      {appointmentsLoading && <Loader />}
      {!appointmentsLoading && (
        <div>
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
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
                    {appointment.appointmentData.date}
                  </span>
                </p>
                <p>
                  Hora:
                  <span className="font-semibold">
                    {appointment.appointmentData.time}
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

// EditUser component
function EditUser({
  user,
  handleUpdateUser,
  toggleEditMode,
  editedUser,
  setEditedUser,
}) {
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

// function Profile() {
//   const [user, setUser] = useState({
//     id: "",
//     email: "",
//     rol: "",
//     fullName: "",
//     bio: "",
//   });
//   const [editedUser, setEditedUser] = useState({ fullName: "", bio: "" });
//   const [userLoading, setUserLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [appointmentsLoading, setAppointmentsLoading] = useState(true);
//   const [appointments, setAppointments] = useState([]);
//   const [serviceData, setServiceData] = useState([]);

//   async function fetchUserData(userId) {
//     try {
//       const userData = await getUserById(userId);
//       return userData.data;
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       throw error;
//     }
//   }

//   const fetchData = async () => {
//     setUserLoading(true);
//     const authToken = localStorage.getItem("token");

//     if (!authToken) {
//       return <Navigate to={"/login"} replace={true} />;
//     }

//     const tokenData = jwtDecode(authToken);

//     try {
//       const userData = await fetchUserData(tokenData.userId);
//       if (userData) {
//         setUser({
//           id: userData._id,
//           email: userData.email,
//           rol: userData.rol,
//           fullName: userData.fullName,
//           bio: userData.bio,
//         });
//         setUserLoading(false);
//       } else {
//         console.error("User data is undefined");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function handleUpdateUser() {
//     const userId = user.id;
//     try {
//       const updatedUserData = await updateUser(editedUser, userId);
//       setUser({
//         ...user,
//         fullName: updatedUserData.fullName,
//         bio: updatedUserData.bio,
//       });
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   }

//   function toggleEditMode() {
//     setEditMode(true);
//     setEditedUser({
//       fullName: user.fullName || "",
//       bio: user.bio || "",
//     });
//   }

//   useEffect(() => {
//     const fetchAppointmentData = async () => {
//       try {
//         if (!user || !user.id) {
//           setAppointmentsLoading(false);
//           return;
//         }
//         const foundAppointments = await getAppointmentByUserId(user.id);
//         setAppointments(foundAppointments);
//         setAppointmentsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setAppointmentsLoading(false);
//       }
//     };

//     fetchAppointmentData();
//   }, [user]);

//   useEffect(() => {
//     const fetchServiceData = async () => {
//       try {
//         const serviceDataPromises = appointments.map(async (appointment) => {
//           if (appointment.serviceId) {
//             return await getServiceDetails(appointment.serviceId);
//           }
//           return null;
//         });

//         const serviceData = await Promise.all(serviceDataPromises);
//         setServiceData(serviceData);
//       } catch (error) {
//         console.error("Error in useEffect for fetching services:", error);
//         setAppointmentsLoading(false);
//       }
//     };

//     fetchServiceData();
//   }, [appointments]);

//   return (
//     <>
//       {userLoading ? (
//         <Loader />
//       ) : (
//         <div className="flex flex-row justify-center my-5 py-5 min-h-screen">
//           <div className="flex flex-col items-start">
//             <h1 className="text-3xl py-3">
//               Mi perfil
//               <FontAwesomeIcon
//                 icon={faUser}
//                 className="mx-2 my-profile-icon"
//                 style={{ color: "#21496b" }}
//               />
//             </h1>
//             <div>
//               <div className="py-2">
//                 {user.fullName && (
//                   <p className="py-2">
//                     Nombre:
//                     <span className="font-semibold"> {user.fullName}</span>
//                   </p>
//                 )}
//                 {user.bio && (
//                   <p className="py-2">
//                     Biografía:
//                     <span className="font-semibold"> {user.bio}</span>
//                   </p>
//                 )}
//               </div>
//               <div className="main-user-info">
//                 <p className="py-2">
//                   Mail:
//                   <span className="">
//                     <span className="font-semibold"> {user.email}</span>
//                   </span>
//                 </p>
//               </div>
//             </div>
//             {!editMode && (
//               <BaseButton
//                 className="px-10 my-2"
//                 onClick={toggleEditMode}
//                 btnText="Editar mi perfil"
//               />
//             )}
//             {editMode && (
//               <div className="flex flex-col">
//                 <form onSubmit={handleUpdateUser} className="my-5">
//                   <div className="flex flex-col">
//                     <label htmlFor="fullName">Nombre Completo</label>
//                     <input
//                       className="border border-solid border-gray-300 rounded-md p-1"
//                       id="fullName"
//                       value={editedUser.fullName}
//                       onChange={(e) =>
//                         setEditedUser({
//                           ...editedUser,
//                           fullName: e.target.value,
//                         })
//                       }
//                       placeholder="Nombre completo"
//                       required
//                     />
//                   </div>
//                   <div className="my-5 flex flex-col">
//                     <label htmlFor="bio">Biografía</label>
//                     <textarea
//                       id="bio"
//                       value={editedUser.bio}
//                       onChange={(e) =>
//                         setEditedUser({
//                           ...editedUser,
//                           bio: e.target.value,
//                         })
//                       }
//                       placeholder="Biografía"
//                       required
//                       className="border border-solid border-gray-300 rounded-md p-1"
//                     />
//                   </div>
//                   <div className="flex justify-around items-center">
//                     <BaseButton
//                       editMode="false"
//                       type="submit"
//                       className="bg-slate-400 mb-3 px-5"
//                       btnText="Cerrar"
//                     />
//                     <BaseButton
//                       btnText="Guardar"
//                       className="mb-3 px-5"
//                       type="submit"
//                     />
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>
//           {/* {user.id && <Appointments user={user} />} */}
//           <div className="mx-5">
//             {appointmentsLoading && <Loader />}
//             {!appointmentsLoading && (
//               <div>
//                 {appointments.map((appointment) => (
//                   <div
//                     key={appointment._id}
//                     className="p-5 flex flex-col rounded-xl border border-solid border-slate-200"
//                   >
//                     <div>
//                       {serviceData.map((service) => (
//                         <div key={service._id}>
//                           <h2 className="text-darkBlue text-xl font-semibold">
//                             {service.name}
//                           </h2>
//                           <p>
//                             <i
//                               className="fa-solid fa-clock"
//                               style={{ color: "#21496b" }}
//                             ></i>
//                             {service.time}
//                           </p>
//                           <p>$ {service.price}</p>
//                         </div>
//                       ))}

//                       <p>
//                         Fecha:
//                         <span className="font-semibold">
//                           {appointment.appointmentData.date}
//                         </span>
//                       </p>
//                       <p>
//                         Hora:
//                         <span className="font-semibold">
//                           {appointment.appointmentData.time}
//                         </span>
//                       </p>
//                       <p className="py-2">
//                         Agendaste una sesión con el consultor Daniel del Valle
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

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
