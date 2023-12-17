export const validateCreateAppointment = (req, res, next) => {
    const { userId, serviceId, appointmentData } = req.body;
  
    if (!userId || !serviceId || !appointmentData) {
      return res.status(400).json({ msg: "Appointment data invalid" });
    }
  
    next();
  };
  