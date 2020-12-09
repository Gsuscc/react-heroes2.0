import React from "react";
import './PowerBar.css'

export const PowerBar = (props) => {
  console.log(props);
  const getColor = () => {
    if (parseInt(props.powerStats) < 30) return "red";
    if (parseInt(props.powerStats) < 70) return "#a2a2a2";
    return "#30d630";
  };

  return (
    <div className="powerbar animate">
      <span
        style={{ width: `${props.powerStats}%`, backgroundColor: getColor() }}
      >
        <span></span>
        {props.powerStats}
      </span>
    </div>
  );
};
