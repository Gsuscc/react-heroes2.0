import React from 'react';
import PropTypes from "prop-types";

const CardHeader = (props) => {
  const getColor = props.getColor;
  const heroName = props.heroName;

  return (
    <div
      style={getColor ? getColor() : { color: "black" }}
      className="card-name dotted"
    >
      <div>{heroName}</div>
    </div>
  )
}

export default CardHeader;

CardHeader.propTypes = {
  heroName: PropTypes.string,
  getColor: PropTypes.func
};