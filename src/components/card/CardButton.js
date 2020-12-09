import React from 'react'
import PropTypes from "prop-types";

const CardButton = (props) => {

  return (
    <div className="card-button dotted" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default CardButton;

CardButton.propTypes = {
  onClick: PropTypes.func,
};

CardButton.defaultProps = {
  onClick: () => {},
};