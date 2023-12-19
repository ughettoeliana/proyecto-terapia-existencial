import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const Notification = ({ notification }) => {
  const getIcon = () => {
    if (notification.type == "success") {
      return (
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#22c55e" }} />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          style={{ color: "#ef4444" }}
        />
      );
    }
  };

  const getBackgroundColor = () => {
    return notification.type === "success" ? "bg-green-200" : "bg-red-200";
  };

  const getTextColor = () => {
    return notification.type === "success" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex items-center text-center p-2 rounded-xl max-w-md ${getBackgroundColor()}`}
      >
        {getIcon()}
        <p className={`pl-2 ${getTextColor()}`}>{notification.message}</p>
      </div>
    </div>
  );
};

export default Notification;
