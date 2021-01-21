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
  const isRightClickabale = props.isRightClickabale;
  const [isFrontPage, setIsFrontPage] = useState(true);
  const { playCardFlip } = useContext(SoundContext);
  const army = props.army;
  const setArmy = props.setArmy;

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
      console.log(army);
      if (isRightClickabale) {
        e.preventDefault();
        if (army.includes(hero)) {
          setArmy(army.filter((selected) => selected !== hero));
        } else if (army.length <= 4) {
          setArmy((army) => [...army, hero]);
        } else {
          console.log("army is full");
        }
      }
    },
    [army, hero, isRightClickabale, setArmy]
  );

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

Card.propTypes = {
  hero: PropTypes.object,
  isFlippable: PropTypes.bool,
  isZoomable: PropTypes.bool,
  isUserCard: PropTypes.bool,
  isRightClickabale: PropTypes.bool,
};

Card.defaultProps = {
  isFlippable: false,
  isZoomable: false,
  isUserCard: false,
  isRightClickabale: false,
};
