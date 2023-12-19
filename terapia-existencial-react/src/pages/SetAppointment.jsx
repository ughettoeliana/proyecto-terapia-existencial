import React, { useEffect, useState } from "react";
import BaseButton from "../components/BaseButton";
import { createAppointment } from "../api/appointment";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Notification from "../components/Notification";

const DateTimePicker = ({ onDateChange, onTimeChange }) => {
  const [selectedDate, setSelectedDate] = useState({ date: "" });
  const [selectedTime, setSelectedTime] = useState({ hour: "" });

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateChange(date);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
    onTimeChange(time);
  };

  const timeOptions = [];
  for (let hour = 8; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return (
    <>
      <div className="mb-3 flex items-start">
        <div className="mx-4">
          <label>Fecha: </label>
          <input
            required
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-solid border-gray-300 rounded-md p-1"
          />
        </div>
        <div>
          <label>Hora: </label>
          <select
            required
            value={selectedTime}
            onChange={handleTimeChange}
            className="border border-solid border-gray-300 rounded-md p-1"
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

function SetAppointment() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const serviceId = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const authToken = localStorage.getItem("token");
  if (!authToken) {
    return <Navigate to={"/login"} replace={true} />;
  }

  const tokenData = jwtDecode(authToken);
  const userId = tokenData.userId;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  function showModal() {
    if (!selectedDate || !selectedTime) {
      setNotification({
        message: "Debes seleccionar una fecha y hora para la cita",
        type: "error",
      });
      return;
    }

    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  async function confirmAppointment() {
    try {
      const appointmentData = {
        date: selectedDate,
        time: selectedTime,
      };
      await createAppointment(userId, serviceId.serviceId, appointmentData);

      setModalVisible(false);

      setNotification({
        message: "Se agendó la cita con éxito",
        type: "success",
      });
      setNotificationModalVisible(true);
    } catch (error) {
      setNotification({
        message: "No se pudo agendar la cita, intentalo de nuevo",
        type: "error",
      });
      setNotificationModalVisible(true);
      console.error("Error en confirmAppointment:", error);
    }
  }

  function goToServices() {
    setNotificationModalVisible(false);
    navigate("/services", { replace: true });
  }

  return (
    <div className="flex flex-col justify-center my-5 py-5 min-h-screen">
      <h1 className="text-2xl self-center p-3 ">Agenda una cita</h1>
      <div className="flex justify-center my-4">
        <div>
          <DateTimePicker
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        </div>
      </div>

      {notification && <Notification notification={notification} />}

      <div className="max-w-2xl text-center mx-auto py-5">
        <BaseButton
          btnText="Continuar"
          onClick={showModal}
          className="w-full bg-primary "
        />
      </div>

      {modalVisible && selectedTime && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded max-w-md text-xl">
            <h2>¿Estás seguro que quieres agendar la cita?</h2>
            <h3 className="mt-6">
              El día: <span className="font-semibold">{selectedDate}</span>
            </h3>
            <h3 className="pt-3 pb-6 mb-8">
              A las: <span className="font-semibold">{selectedTime} hs</span>
            </h3>
            <div className="flex justify-around items-center my-4">
              <button
                onClick={closeModal}
                className="rounded-lg p-2 bg-slate-400 text-white"
              >
                Cerrar
              </button>

              <button
                onClick={confirmAppointment}
                className="rounded-lg p-2 bg-primary text-white"
              >
                Sí, agendar cita
              </button>
            </div>
          </div>
        </div>
      )}

      {notificationModalVisible && notification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-2 rounded-xl max-w-md${
                notification.type === "success"
                  ? " bg-green-200"
                  : " bg-red-200"
              }`}>
            <Notification notification={notification} />
            <div className="text-right">
              <BaseButton
              onClick={goToServices}
              className='bg-green-500'
              btnText="Cerrar"
            />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default SetAppointment;
