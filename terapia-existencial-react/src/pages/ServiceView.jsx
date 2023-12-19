import React, { useEffect, useState } from "react";
import BaseButton from "../components/BaseButton";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { getComments, submitComment } from "../api/feedbacks";
import { getServiceDetails, getServices } from "../api/service";

function ServiceView() {
  //const [modalVisible, setModalVisible] = useState(false);
  const [service, setService] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [serviceComments, setServiceComments] = useState([]);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [commentMode, setCommentMode] = useState(false);

  const showComments = async () => {
    try {
      const data = await getComments(serviceId);

      if (data) {
        setServiceComments(data);
      }
    } catch (error) {
      console.error("Error in showComments:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setServiceLoading(true);
        const data = await getServiceDetails(serviceId);
        setService(data);
        if (data) {
          showComments();
          setService(data);
          setServiceLoading(false);
        } else {
          navigate("/not-found");
        }
        setService(data);
        setServiceLoading(false);
        //setModalVisible(false);
      } catch (error) {
        console.error("Error in useEffect for fetching services:", error);
        setServiceLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScheduleAppointment = async (service) => {
    const serviceId = service._id;
    navigate(`/services/${serviceId}/set-appointment`, { replace: true });
  };

  const toggleCommentMode = () => {
    setCommentMode(true);
  };

  const getUserEmail = () => {
    try {
      const authToken = localStorage.getItem("token");

      if (authToken) {
        const tokenData = jwtDecode(authToken);
        const email = tokenData.email;
        return email;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const handleSubmitComment = async (e) => {
    try {
      e.preventDefault();
      const email = getUserEmail();
      if (!comment) {
        console.error("El comentario no puede estar vacío");
        return;
      }
      const commentData = {
        comment,
        email,
        serviceId,
      };

      const response = await submitComment(commentData);

      if (response) {
        showComments();
        setComment("");
        setCommentMode(false)
      } else {
        console.error("Error al enviar el comentario");
      }
    } catch (error) {
      console.error("Error en handleSubmitComment:", error);
    }
  };

  useEffect(() => {}, [serviceComments]);

  return (
    <div>
      {serviceLoading && <Loader />}
      {!serviceLoading && (
        <div className="p-1">
          <h1 className="text-3xl text-center pt-2">{service.name}</h1>
          <div className="flex justify-center container px-4 mx-auto min-h-screen">
            <div className="px-5 m-10">
              <div className="rounded-xl border border-solid border-slate-300 p-4">
                <p>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="pr-1"
                    style={{ color: "#21496b" }}
                  />
                  Duración: {service.time} hs.
                </p>
                <p>Precio: ${service.price}usd</p>
                <p>Modalidad: {service.modality}</p>
                <p className="py-2">
                  Agenda una sesión con el consultor Daniel del Valle
                </p>
              </div>
              {!commentMode && (
                <div className="flex justify-between mt-4">
                  <BaseButton
                  className='bg-primary'
                    onClick={() => handleScheduleAppointment(service)}
                    btnText="Agendar Cita"
                  />
                  <BaseButton
                    onClick={toggleCommentMode}
                    className="self-end bg-slate-400"
                    btnText="Comentar"
                  />
                </div>
              )}

              <div className="flex flex-col">
                {commentMode && (
                  <form onSubmit={handleSubmitComment} className="my-5">
                    <div className="my-5">
                      <label htmlFor="comment">
                        Deja un comentario sobre esta sesión
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        placeholder="Deja tu comentario"
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="border border-solid border-gray-300 rounded-md p-1 w-full"
                      ></textarea>
                    </div>
                    <div className="flex justify-around items-center">
                      <BaseButton
                        type="button"
                        onClick={() => {
                          setCommentMode(false);
                          setComment("");
                        }}
                        className="bg-slate-400 mb-3 px-5"
                        btnText="Cerrar"
                      ></BaseButton>
                      <BaseButton
                        type="submit"
                        className="mb-2 px-5 bg-primary"
                        btnText="Enviar"
                      ></BaseButton>
                    </div>
                  </form>
                )}
              </div>

              {/* {modalVisible && selectedService === service && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded max-w-md text-xl">
                    <div className="py-3">
                      <h2>¿Estás seguro que querés agendar esta cita?</h2>
                      <h3 className="text-darkBlue font-semibold py-4">
                        {service.name}
                      </h3>
                    </div>
                    <button
                      onClick={closeModal}
                      className="rounded-lg p-2 m-2 bg-gray-200"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleScheduleAppointment(service)}
                      className="rounded-lg p-2 bg-primary text-white"
                    >
                      Sí, estoy seguro
                    </button>
                  </div>
                </div>
              )} */}
              {serviceComments && serviceComments.length > 0 && (
                <div className="rounded-xl border border-solid border-slate-300 my-5 p-4">
                  <h2 className="text-xl text-center">Comentarios</h2>
                  {serviceComments
                    .slice()
                    .reverse()
                    .map((comment, index) => (
                      <div
                        key={index}
                        className="p-5 border-b border-solid border-slate-300 "
                      >
                        {comment.comment}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceView;
