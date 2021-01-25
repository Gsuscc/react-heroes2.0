import React from 'react';
import PropTypes from "prop-types";
import HeroButton from '../misc/HeroButton';


const CardHeader = (props) => {
  const getColor = props.getColor;
  const heroName = props.heroName;
  const sellable = props.sellable;

  const handleSell = (e) =>{
    e.stopPropagation()
  }

  return (
    <div
      style={getColor ? getColor() : { color: "black" }}
      className={"card-name dotted"}
    >
      <div>{heroName}</div>
      {sellable && <div className="sell-button"><HeroButton onClick={handleSell}>X</HeroButton></div> }
    </div>
  )
}

export default CardHeader;

CardHeader.propTypes = {
  heroName: PropTypes.string,
  getColor: PropTypes.func
};