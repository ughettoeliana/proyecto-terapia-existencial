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

//trae un comentario por id
//route.get('/feedback/:id', feedbackController.getFeedbackById)
//trae los comentarios por servicio
//route.get('/feedbacks/:serviceId', feedbackController.getFeedbackByServiceId)
//route.put('/feedback/:id', feedbackController.updateFeedback)

export default route;
