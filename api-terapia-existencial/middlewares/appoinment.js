export const validateCreateAppoinment = (req, res, next) => {
    const { userId, serviceId, appoinmentData } = req.body;
  
    if (!userId || !serviceId || !appoinmentData) {
      return res.status(400).json({ msg: "Datos del comentario no válidos" });
    }
  
    next();
  };
  