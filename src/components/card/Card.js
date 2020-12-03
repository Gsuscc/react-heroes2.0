import React, { useState } from "react";
import PropTypes from "prop-types";
// import useSound from "use-sound";
// import swoosh from "../sounds/swoosh.mp3";
import FrontPage from "./FrontPage";
import BackPage from "./BackPage";
import './Card.css'

const Card = (props) => {
  const hero = props.hero;
  const isFlippable = props.isFlippable;
  const isZoomable = props.isZoomable;
  const isDetailsVisible = props.isDetailsVisible;
  const [isFrontPage, setIsFrontPage] = useState(true);

  // const [play] = useSound(swoosh, { volume: 0.2 });

  const getColor = () => {
    if (hero.biography.alignment === "good") return { color: "darkgreen" };
    if (hero.biography.alignment === "bad") return { color: "darkred" };
    return { color: "yellow" };
  };

  const flip = (e) => {
    // play();
    setIsFrontPage(!isFrontPage);
  };

  return (
    <div class="scene" onClick={isFlippable && flip}>
      <div class={isFrontPage ? "card" : "card is-flipped"}>
        <FrontPage hero={hero} getColor={getColor} visible={isFrontPage}/>
        {isFlippable && (<BackPage hero={hero} getColor={getColor} visible={!isFrontPage}/>)}
      </div>
    </div>
  )
}

export default Card;

Card.propTypes = {
  hero: PropTypes.object,
  isFlippable: PropTypes.bool,
  isZoomable: PropTypes.bool,
  isDetailsVisible: PropTypes.bool
};

Card.defaultProps = {
  isFlippable: false,
  isZoomable: false,
  isDetailsVisible: false
};