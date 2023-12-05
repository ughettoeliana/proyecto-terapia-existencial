import serviceServices from "../services/service.js";

const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const createdService = await serviceServices.createService(serviceData);
    res.status(201).json({ data: createdService });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al crear el servicio", error: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const foundServices = await serviceServices.getServices();
    res.status(201).json({ data: foundServices });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al traer el servicio", error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundServices = await serviceServices.getServiceById(id);
    res.status(201).json({ data: foundServices });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al traer el servicio", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, modality, time, price } = req.body;
    const updateService = await serviceServices.updateService(id, {
      name,
      modality,
      time,
      price,
    });
    res.status(201).json({ data: updateService });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al actualizar el servicio", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteService = await serviceServices.deleteService(id);
    res.status(201).json({ data: deleteService });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al crear el servicio", error: error.message });
  }
};

export default {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
