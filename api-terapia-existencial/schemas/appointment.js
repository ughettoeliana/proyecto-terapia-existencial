import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  appointmentData: {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
});

const appointmentSchema = mongoose.model("Appointment", AppointmentSchema);

export default appointmentSchema;
