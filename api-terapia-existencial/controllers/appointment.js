import userSchema from "../schemas/user.js";
import appointmentServices from "../services/appointment.js";

const createAppointment = async (req, res) => {
  try {
    const { userId, serviceId, appointmentData } = req.body;
    const data = {
      userId: userId,
      serviceId: serviceId,
      appointmentData: {
        date: appointmentData.date,
        time: appointmentData.time,
      },
    };
    const createdAppointment = await appointmentServices.createAppointment(data);
    res.status(201).json({ data: createdAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al crear la cita", error: error.message });
  }
};

const getAppointment = async (req, res) => {
    try {
      const foundAppointments = await appointmentServices.getAppointment();
      res.status(201).json({ data: foundAppointments });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error al traer la cita", error: error.message });
    }
  };


const getAppointmentByUserId = async (req, res) => {
    try {
      const {userId} = req.params;
      const foundAppointments = await appointmentServices.getAppointmentByUserId(userId);
      res.status(201).json({ data: foundAppointments });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error al traer la cita", error: error.message });
    }
  };



  const deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAppointment = await appointmentServices.deleteAppointment(id);
      res.status(201).json({ data: deleteAppointment });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error al eliminar el comentario", error: error.message });
    }
  };


export default { createAppointment, getAppointment, getAppointmentByUserId,deleteAppointment };
