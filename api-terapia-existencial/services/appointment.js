import appointmentSchema from "../schemas/appointment.js";

const createAppointment = async (appointmentData) => {
  try {
    const appointment = new appointmentSchema(appointmentData);
    const savedAppointment = await appointment.save();
    return savedAppointment;
  } catch (error) {
    throw error;
  }
};

const getAppointment = async () => {
  try {
    const foundAppointment = await appointmentSchema.find();
    return foundAppointment;
  } catch (error) {
    throw error;
  }
}

const getAppointmentByUserId = async (userId) => {
  try {
    const foundAppointment = await appointmentSchema.find({ userId: userId });
    return foundAppointment;
  } catch (error) {
    throw error;
  }
};

const deleteAppointment = async (id) => {
    try {
      const deletedAppointment = await appointmentSchema.findOneAndDelete({ _id: id });
      return deletedAppointment;
    } catch (error) {
      throw error;
    }
  };

export default { createAppointment, getAppointment, deleteAppointment, getAppointmentByUserId};
