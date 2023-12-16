import appoinmentSchema from "../schemas/appoinment.js";

const createAppoinment = async (appoinmentData) => {
  try {
    const appoinment = new appoinmentSchema(appoinmentData);
    const savedAppoinment = await appoinment.save();
    return savedAppoinment;
  } catch (error) {
    throw error;
  }
};

const getAppoinment = async () => {
  try {
    const foundAppoinment = await appoinmentSchema.find();
    return foundAppoinment;
  } catch (error) {
    throw error;
  }
};

const deleteAppoinment = async (id) => {
    try {
      const deletedAppoinment = await appoinmentSchema.findOneAndDelete({ _id: id });
      return deletedAppoinment;
    } catch (error) {
      throw error;
    }
  };

export default { createAppoinment, getAppoinment, deleteAppoinment};
