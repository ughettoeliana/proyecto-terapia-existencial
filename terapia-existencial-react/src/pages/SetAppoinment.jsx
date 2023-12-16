import React, { useEffect, useState } from "react";
import BaseButton from "../components/BaseButton";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState({ date: "" });
  const [selectedTime, setSelectedTime] = useState({ hour: "" });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const timeOptions = [];
  for (let hour = 8; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }


  console.log("selectedDate", selectedDate);
  console.log("selectedTime", selectedTime);

  return (
    <>
      <div className="mb-3 flex items-start">
        <div className="mx-4">
          <label>Fecha: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-solid border-gray-300 rounded-md p-1"
          />
        </div>
        <div>
          <label>Hora: </label>
          <select
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
          {/* <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="border border-solid border-gray-300 rounded-md p-1"
          /> */}
        </div>
      </div>
    </>
  );
};

function SetAppoinment() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl self-center p-3 ">Agenda una cita</h1>
      <div className="flex justify-center my-4">
        <div>
          <DateTimePicker />
        </div>
      </div>
      <div className="max-w-2xl text-center mx-auto py-5">
        <BaseButton
          btnText="Continuar"
          //onClick={showModal}
          className="w-full"
        />
      </div>

      {/* {modalVisible && appointmentDateAndHour && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded max-w-md text-xl">
            <h2>¿Estás seguro que quieres agendar la cita?</h2>
            <h3 className="mt-6">
              El día:
              <span className="font-semibold">
                {appointmentDateAndHour.date}
              </span>
            </h3>
            <h3 className="pt-3 pb-6 mb-8">
              A las:
              <span className="font-semibold">
                {appointmentDateAndHour.hour} hs
              </span>
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
      )} */}
      {/* 
      <div
        className={`flex justify-around items-center max-w-lg text-center p-2 mx-auto text-md ${
          notification.message !== null
            ? notification.type === "success"
              ? "text-green-500 bg-green-200 rounded-xl"
              : "text-red-500 bg-red-200 rounded-xl"
            : ""
        }`}
      >
        {notification.message}
      </div> */}
    </div>
  );
}

export default SetAppoinment;
