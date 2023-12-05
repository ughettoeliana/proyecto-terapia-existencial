import userSchema from "../schemas/user.js";
import feedbackServices from "../services/feedback.js";
//import accountSchema from "../schemas/account.js";

const createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    const accountData = await userSchema.findOne({ email: feedbackData.email });
    const data = { userId: accountData._id.toString(), serviceId: feedbackData.serviceId, comment: feedbackData.comment}
    const createdFeedback = await feedbackServices.createFeedback(data);
    res.status(201).json({ data: createdFeedback });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al crear el comentario", error: error.message });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const foundFeedbacks = await feedbackServices.getFeedbacks();
    res.status(201).json({ data: foundFeedbacks });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al traer el comentario", error: error.message });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundFeedback = await feedbackServices.getFeedbackById(id);
    res.status(201).json({ data: foundFeedback });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al obtener el comentario", error: error.message });
  }
};


const getFeedbackByServiceId = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const foundFeedbacks = await feedbackServices.getFeedbackByServiceId(serviceId);
    return res.status(200).json({ data: foundFeedbacks });
  } catch (error) {
    console.error('Error al obtener comentarios por ID de servicio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, serviceId, comment } = req.body;
    const updateFeedback = await feedbackServices.updateFeedback(id, {
      userId,
      serviceId,
      comment,
    });
    res.status(201).json({ data: updateFeedback });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al crear el comentario", error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFeedback = await feedbackServices.deleteFeedback(id);
    res.status(201).json({ data: deleteFeedback });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al eliminar el comentario", error: error.message });
  }
};

export default {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  getFeedbackByServiceId
};
