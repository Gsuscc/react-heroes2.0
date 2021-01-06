import React from "react";
import PropTypes from "prop-types";

function CardDock(props) {
  const getStyle = () => {
    return {
      margin: props.margin,
    };
  };

  return (
    <div className="card-dock" style={getStyle()}>
      {props.children}
    </div>
  );
}

export default CardDock;

CardDock.propTypes = {
  margin: PropTypes.string,
};

CardDock.defaultProps = {
  margin: "10px",
};
