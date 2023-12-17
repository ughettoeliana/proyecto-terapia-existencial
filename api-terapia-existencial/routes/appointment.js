import express from "express";
import appoinmentController from "../controllers/appoinment.js";
import { validateCreateAppoinment } from "../middlewares/appoinment.js";
const route = express.Router();

//CRUD of the feedback

route.post(
  "/appoinment",
  [validateCreateAppoinment],
  appoinmentController.createAppoinment
);
route.get("/appoinments", appoinmentController.getAppoinment);
route.get('/appoinments/:userId', appoinmentController.getAppoinmentByUserId)

route.delete('/appoinment/:id', appoinmentController.deleteAppoinment)

//trae un comentario por id
//route.get('/feedback/:id', feedbackController.getFeedbackById)
//trae los comentarios por servicio
//route.get('/feedbacks/:serviceId', feedbackController.getFeedbackByServiceId)
//route.put('/feedback/:id', feedbackController.updateFeedback)

export default route;
