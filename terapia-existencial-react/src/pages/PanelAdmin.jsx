import React, { useState, useEffect } from "react";
import PanelAdminNav from "../components/PanelAdminNav";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { deleteService, getServices } from "../api/service";

const PanelAdmin = () => {
  const [deletingService, setDeletingService] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [panelLoading, setPanelLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const showModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  const fetchData = async () => {
    try {
      setPanelLoading(true);
      const data = await getServices();

      setServices(data);
      setPanelLoading(false);
      setModalVisible(false);
    } catch (error) {
      console.error("Error in useEffect for fetching services:", error);
      setPanelLoading(false);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);

  const handleDeleteService = async (serviceId) => {
    try {
      setDeletingService(true);
      await deleteService(serviceId);
      setModalVisible(false);
      fetchData();
    } finally {
      setDeletingService(false);
    }
  };

  const handleEditService = (service) => {
    const serviceId = service._id;
    navigate(`/edit-service/${serviceId}`, {replace: true});
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium p-3">Panel Administrador</h1>

      <PanelAdminNav />

      {panelLoading ? (
        <Loader />
      ) : (
        <div className="my-10">
          <table>
            <thead className="px-2">
              <tr>
                <th className="px-2">Servicio</th>
                <th className="px-2">Tiempo</th>
                <th className="px-2">Modalidad</th>
                <th className="px-2">Precio</th>
                <th className="px-2">Acciones</th>
              </tr>
            </thead>
            {services.map((service) => (
              <tbody key={service._id}>
                <tr className="bg-slate-100 border border-solid border-white p-2 text-center">
                  <td className="bg-slate-100 border-2 border-solid border-white p-2">
                    {service.name}
                  </td>
                  <td className="bg-slate-100 border-2 border-solid border-white p-2">
                    {service.time}
                  </td>
                  <td className="bg-slate-100 border-2 border-solid border-white p-2">
                    {service.modality}
                  </td>
                  <td className="bg-slate-100 border-2 border-solid-2 border-white p-2">
                    ${service.price}
                  </td>
                  <td className="bg-slate-100 border-solid border-2 border-white p-2">
                    <div className="p-3">
                      <button
                        type="button"
                        className="rounded-lg p-2 bg-red-500 text-white"
                        onClick={() => showModal(service)}
                      >
                        Eliminar
                      </button>
                      <button
                        type="button"
                        className="rounded-lg mx-2 p-2 bg-amber-400 text-white"
                        onClick={() => handleEditService(service)}
                      >
                        Editar
                      </button>

                      {/* Modal */}
                      {modalVisible && selectedService === service && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-8 rounded max-w-md text-xl">
                            <h2 className="">
                              Eliminar:
                              <span className="text-red-500 font-medium">
                                {selectedService.name}
                              </span>
                            </h2>
                            <p className="py-3 mb-8">
                              ¿Estás seguro que quieres eliminar este servicio?
                            </p>
                            <div className="flex justify-around items-center my-4">
                              <button
                                onClick={closeModal}
                                className="rounded-lg p-2 bg-slate-400 text-white"
                              >
                                Cerrar
                              </button>
                              <button
                                className="rounded-lg p-2 bg-red-500 text-white"
                                onClick={() => handleDeleteService(service._id)}
                              >
                                Si, eliminar
                              </button>
                            </div>
                            {deletingService && selectedService === service && (
                              <Loader />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default PanelAdmin;
