import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import PanelAdminNav from "../components/PanelAdminNav";
import { editService, getServiceDetails } from "../api/service";

const EditService = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service, setService] = useState({});
  const [editServiceLoading, setEditServiceLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    time: "",
    modality: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "time" ? value : String(value),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEditServiceLoading(true);
  
        const data = await getServiceDetails(serviceId);
  
        if (data) {
          setService(data);
          setForm({
            name: data.name,
            time: data.time,
            modality: data.modality,
            price: data.price,
          });
          setEditServiceLoading(false);
        }
      } catch (error) {
        console.error("Error in useEffect for fetching service details:", error);
      }
    };
  
    fetchData();
  }, [serviceId, navigate]);


  const handleEditService = async (e) => {
    try {
      e.preventDefault();
      if (!form) {
        console.error("Los datos no pueden estar vacío");
        return;
      }
      const formData = {
        name: form.name,
        time: String(form.time),
        price: form.price,
        modality: form.modality,
      };

      await editService(serviceId, formData);
      navigate("/panel");
    } catch (error) {
      console.error("Error en handleEditService:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl">Editar el servicio</h1>
      <PanelAdminNav />

      <div>
        <form onSubmit={handleEditService}>
          <div className="flex flex-col">
            <label htmlFor="name">Nombre</label>
            <BaseInput
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChange}
              disabled={editServiceLoading}
              required
            />
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label htmlFor="time">Tiempo</label>
              <BaseInput
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleInputChange}
                disabled={editServiceLoading}
                required
                className="mr-5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Precio</label>
              <BaseInput
                className="price-input"
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleInputChange}
                disabled={editServiceLoading}
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <p>Modalidad</p>
            <div className="pr-2">
              <input
                className=""
                type="radio"
                name="modality"
                id="virtual"
                value="Virtual"
                checked={form.modality === "Virtual"}
                onChange={handleInputChange}
              />
              <label className="" htmlFor="virtual">
                Virtual
              </label>
            </div>
            <div className="pr-2">
              <input
                className=""
                type="radio"
                name="modality"
                id="presencial"
                value="Presencial"
                checked={form.modality === "Presencial"}
                onChange={handleInputChange}
              />
              <label className="" htmlFor="presencial">
                Presencial
              </label>
            </div>
            <p
              style={{ display: !form.modality ? "block" : "none" }}
              className="text-red-500"
            >
              Debes seleccionar al menos una opción.
            </p>
          </div>
          <BaseButton
            loading={editServiceLoading}
            type="submit"
            className="my-2 bg-primary "
            btnText="Editar Servicio"
          />
        </form>
      </div>
    </div>
  );
};

export default EditService;
