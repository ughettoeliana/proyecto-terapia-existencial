import express from "express";
import appointmentController from "../controllers/appointment.js";
import { validateCreateAppointment } from "../middlewares/appointment.js";
const route = express.Router();

//CRUD of the feedback

route.post(
  "/appointment",
  [validateCreateAppointment],
  appointmentController.createAppointment
);
route.get("/appointments", appointmentController.getAppointment);
route.get('/appointments/:userId', appointmentController.getAppointmentByUserId)

route.delete('/appointment/:userId/:appointmentId', appointmentController.deleteUserAppointment)

export default route;
