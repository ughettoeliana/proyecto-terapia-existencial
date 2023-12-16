import userSchema from "../schemas/user.js";
import appoinmentServices from "../services/appoinment.js";

const createAppoinment = async (req, res) => {
  try {
    const { userId, serviceId, appoinmentData } = req.body;
    const data = {
      userId: userId,
      serviceId: serviceId,
      appoinmentData: {
        date: appoinmentData.date,
        hour: appoinmentData.hour,
      },
    };
    const createdAppoinment = await appoinmentServices.createAppoinment(data);
    res.status(201).json({ data: createdAppoinment });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al crear la cita", error: error.message });
  }
};

const getAppoinment = async (req, res) => {
    try {
      const foundAppoinments = await appoinmentServices.getAppoinment();
      res.status(201).json({ data: foundAppoinments });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error al traer la cita", error: error.message });
    }
  };

  const deleteAppoinment = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAppoinment = await appoinmentServices.deleteAppoinment(id);
      res.status(201).json({ data: deleteAppoinment });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error al eliminar el comentario", error: error.message });
    }
  };


export default { createAppoinment, getAppoinment, deleteAppoinment };
