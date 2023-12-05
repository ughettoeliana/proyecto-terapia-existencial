import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import React from "react";

function Loader() {
  return (
    <div className="loader min-h-screen text-center w-full pt-10">
      <div>
        <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#0099ff" }} />
        <span>Cargando...</span>
      </div>
    </div>
  );
}

export default Loader;
