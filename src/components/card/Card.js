import React, { useState } from "react";
import PropTypes from "prop-types";
import useSound from "use-sound";
import card from "../../sounds/card.wav";
import FrontPage from "./FrontPage";
import BackPage from "./BackPage";
import './Card.css';

const Card = (props) => {
  const hero = props.hero;
  const isFlippable = props.isFlippable;
  const isZoomable = props.isZoomable;
  const isUserCard = props.isUserCard;
  const [isFrontPage, setIsFrontPage] = useState(true);

  const [play] = useSound(card, { volume: 0.2 });

  const getColor = () => {
    if (hero.biography.alignment === "good") return { color: "darkgreen" };
    if (hero.biography.alignment === "bad") return { color: "darkred" };
    if (hero.biography.alignment === "neutral") return { color: "yellow" };
    return { color: "black" }
  };

  const flip = (e) => {
    play();
    isFlippable && setIsFrontPage(!isFrontPage);
  };

  return (
    <div className={isZoomable ? "card-scene card-zoom" : "card-scene" } onClick={flip}>
      <div className={isFrontPage ? "card" : "card is-flipped"}>
        <FrontPage hero={hero} getColor={getColor} isUserCard={isUserCard} />
        {isFlippable && (<BackPage hero={hero} getColor={getColor} isUserCard={isUserCard} />)}
      </div>
    </div>
  )
}

export default Card;

Card.propTypes = {
  hero: PropTypes.object,
  isFlippable: PropTypes.bool,
  isZoomable: PropTypes.bool,
  isUserCard: PropTypes.bool,
};

Card.defaultProps = {
  isFlippable: false,
  isZoomable: false,
  isUserCard: false,
};