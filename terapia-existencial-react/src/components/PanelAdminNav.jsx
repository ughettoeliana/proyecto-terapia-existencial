import BaseNavLi from "./BaseNavLi";
import { Link } from "react-router-dom";

const PanelAdminNav = () => {
    return (
      <div className="p-5 my-5">
        <ul className="flex flex-row justify-around items-center">
          <BaseNavLi className="px-3">
            <Link to="/panel" className="">
              Servicios
            </Link>
          </BaseNavLi>
          <BaseNavLi className="px-3">
            <Link to="/create-service" className="">
              Crear un nuevo servicio
            </Link>
          </BaseNavLi>
        </ul>
      </div>
    );
  };
  
  export default PanelAdminNav;