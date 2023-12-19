import React, { useEffect, useState } from "react";
import BaseButton from "../components/BaseButton";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getServices } from "../api/service";

function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [servicesLoading, setServicesLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setServicesLoading(true);
  
        const data = await getServices();
  
        if (data) {
          setServices(data);
          setServicesLoading(false);
        }else {
          navigate('/login',{replace: true})
        }
      } catch (error) {
        console.error("Error in useEffect for fetching services:", error);
        setServicesLoading(false);
        navigate('/not-found',{replace: true})
      }
    };
  
    fetchData();
  }, []);

  const handleRedirect = async (service) => {
    const serviceId = service._id.replace(/^"|"$/g, "");
    navigate(`/services/${serviceId}`,{replace: true});
  };

  return (
    <div>
      {servicesLoading && <Loader />}
      {!servicesLoading && (
        <div>
          <h1 className="text-3xl text-center">Servicios</h1>
          <div className="flex justify-center items-center container mx-auto min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map(
                (service) =>
                  service._id && (
                    <div key={service._id} className="p-5 flex flex-col">
                      <div className="rounded-xl border border-solid border-slate-200 p-5">
                        <div>
                          <h2 className="text-darkBlue text-xl font-semibold">
                            {service.name}
                          </h2>
                          <p>
                            <i
                              className="fa-solid fa-clock"
                              style={{ color: "#21496b" }}
                            ></i>
                            {service.time}
                          </p>
                          <p>$ {service.price}</p>
                          <p><span className="font-semibold">Modalidad:</span> {service.modality}</p>
                          <p className="py-2">
                            Agenda una sesión con el consultor Daniel del Valle
                          </p>
                          <BaseButton
                            btnText="Más acciones"
                            onClick={() => handleRedirect(service)}
                          />
                        </div>
                        <div></div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
