import React from "react";
import PropTypes from "prop-types";

function CardDockMini(props) {
  const getStyle = () => {
    return {
      transform: "scale(0.4)",
      transformOrigin: "top left",
      position: "absolute",
    };
  };

  return <div style={getStyle()}>{props.children}</div>;
}

export default CardDockMini;

CardDockMini.propTypes = {
  margin: PropTypes.string,
};

CardDockMini.defaultProps = {
  margin: "10px",
};
