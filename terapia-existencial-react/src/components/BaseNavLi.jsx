import React from "react";

function BaseNavLi(props) {
  return (
    <li className="text-gray-400 hover:text-black p-2">
      {props.children}
    </li>
  );
}

export default BaseNavLi;
