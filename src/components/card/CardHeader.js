import React, { useContext } from 'react';
import PropTypes from "prop-types";
import HeroButton from '../misc/HeroButton';
import axios from 'axios'
import { GlobalContext } from '../../state/GlobalState';
import { MyCardContext, MyCardState } from '../../state/MyCardState';


const CardHeader = (props) => {
  const getColor = props.getColor;
  const heroName = props.heroName;
  const sellable = props.sellable;
  const uniqueId = props.uniqueId
  const { refreshUserDetails, addNewAlert } = useContext(GlobalContext);
  const { setHeroesList } = useContext(MyCardContext);
  
  
  const handleSell = (e) =>{
    e.stopPropagation()
    axios.delete(`http://localhost:8762/api/user/sell-card`, {
      withCredentials: true,
      data: {
        uniqueId: uniqueId
      }
    })
    .then(response => {
      refreshUserDetails()
      setHeroesList((heroesList) => heroesList.filter(hero => hero.uniqueId !== uniqueId))
      addNewAlert("Sold Successfully!", "green")
    })
    .catch(err => addNewAlert(err.response.data));
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
  getColor: PropTypes.func,
  sellable: PropTypes.bool,
  uniqueId: PropTypes.number
};