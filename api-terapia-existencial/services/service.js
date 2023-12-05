import serviceSchema from "../schemas/service.js";

const createService = async (serviceData) => {
  try {
    const service = new serviceSchema(serviceData);
    const savedService = await service.save();
    return savedService;
  } catch (error) {
    throw error;
  }
};

const getServices = async () => {
  try {
    const foundServices = await serviceSchema.find();
    return foundServices;
  } catch (error) {
    throw error;
  }
};

const getServiceById = async (id) => {
  try {
    const foundService = await serviceSchema.findById(id);
    return foundService;
  } catch (error) {
    throw error;
  }
};

const updateService = async (id,  { name, modality, time, price }) => {
  try {
    const updateService = await serviceSchema.updateOne(
      { _id: id },
      { $set:  { name, modality, time, price }}
    );
    return updateService;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (id) => {
  try {
    const deletedService = await serviceSchema.findOneAndDelete({ _id: id });
    return deletedService;
  } catch (error) {
    throw error;
  }
};

export default { createService, getServices, getServiceById, updateService, deleteService };
