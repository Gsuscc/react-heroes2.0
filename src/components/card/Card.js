import React, { useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import FrontPage from "./FrontPage";
import BackPage from "./BackPage";
import "./Card.css";
import { SoundContext } from "../../state/SoundState";
import { GlobalContext } from "../../state/GlobalState";

const Card = (props) => {
  const hero = props.hero;
  const isFlippable = props.isFlippable;
  const isZoomable = props.isZoomable;
  const isUserCard = props.isUserCard;
  const isRightClickabale = props.isRightClickabale
  const [isFrontPage, setIsFrontPage] = useState(true);
  const { playCardFlip } = useContext(SoundContext);
  const { army, setArmy } = useContext(GlobalContext);

  const getColor = () => {
    if (hero.biography.alignment === "good") return { color: "darkgreen" };
    if (hero.biography.alignment === "bad") return { color: "darkred" };
    if (hero.biography.alignment === "neutral") return { color: "yellow" };
    return { color: "black" };
  };

  const flip = (e) => {
    playCardFlip();
    isFlippable && setIsFrontPage(!isFrontPage);
  };

  const handleRightClick = useCallback(
    (e) => {
      if(isRightClickabale){
        e.preventDefault()
        console.log(army.length)
        if (army.length <= 4){
          setArmy(army => [...army, hero])
        }
        else{console.log('army is full')}
      }
    },
    [army, hero, isRightClickabale, setArmy],
  ) 

  return (
    <div
      className={isZoomable ? "card-scene card-zoom" : "card-scene"}
      onClick={flip}
      onContextMenu={handleRightClick}
    >
      <div className={isFrontPage ? "card" : "card is-flipped"}>
        <FrontPage hero={hero} getColor={getColor} isUserCard={isUserCard} />
        {isFlippable && (
          <BackPage hero={hero} getColor={getColor} isUserCard={isUserCard} />
        )}
      </div>
    </div>
  );
};

export default Card;


Card.defaultProps = {
  isFlippable: false,
  isZoomable: false,
  isUserCard: false,
  isRightClickabale: false
};
