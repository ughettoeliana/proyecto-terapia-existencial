export const validateCreateFeedback = (req, res, next) => {
  const { email, serviceId, comment } = req.body;

  if (!email || !serviceId || !comment) {
    return res.status(400).json({ msg: "Datos del comentario no válidos" });
  }

  next();
};
