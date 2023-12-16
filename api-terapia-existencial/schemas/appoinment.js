import mongoose from "mongoose";

const AppoinmentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  appoinmentData: {
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
});

const appoinmentSchema = mongoose.model("Appoinment", AppoinmentSchema);

export default appoinmentSchema;
