import React from "react";

const Alert = (props) => {
  const getColor = () => {
    if (props.color === "green") return { color: "green" };
    return { color: "red" };
  };

  return (
    <div className="alert" style={getColor()}>
      {props.children}
    </div>
  );
};

export default Alert;
