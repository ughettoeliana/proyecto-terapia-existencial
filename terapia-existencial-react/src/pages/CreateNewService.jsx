import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import PanelAdminNav from "../components/PanelAdminNav";
import { createNewService } from "../api/service";

const CreateService = () => {
  const navigate = useNavigate();

  const [createServiceLoading, setCreateServiceLoading] = useState(false);
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

  const handleCreateNewService = async (e) => {
    try {
      e.preventDefault();
      if (!form) {
        console.error("Los datos no pueden estar vacíos");
        return;
      }
      const formData = {
        name: form.name,
        time: String(form.time),
        price: form.price,
        modality: form.modality,
      };
      await createNewService(formData);
      navigate("/panel");
    } catch (error) {
      console.error("Error en handleCreateNewService:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl">Crear un nuevo servicio</h1>
      <PanelAdminNav />

      <div className="">
        <form onSubmit={handleCreateNewService} className="">
          <div className="flex flex-col">
            <label htmlFor="name">Nombre</label>
            <BaseInput
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChange}
              disabled={createServiceLoading}
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
                disabled={createServiceLoading}
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
                disabled={createServiceLoading}
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
            loading={createServiceLoading}
            type="submit"
            className="my-2 bg-primary "
            btnText="Crear Servicio"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateService;
