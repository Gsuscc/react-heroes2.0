import React from 'react'
import PropTypes from "prop-types";
import CardHeader from "./CardHeader"
import CardLevel from './CardLevel';

const FrontPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;
  const sellable = props.isSellable;



  return (
    <div className="card__face card__face--front">
      <div className={`card-border card-rarity-${hero.rarity.toLowerCase()}`}>
        <div className="card-body">
          <CardHeader getColor={getColor} heroName={hero.name} sellable={sellable} uniqueId={hero.uniqueId} />
          <div className="card-image-container">
            {props.isUserCard && <CardLevel level={hero.level} />}
            <img className="card-image" src={hero.image.url} alt="img" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrontPage;

FrontPage.propTypes = {
  hero: PropTypes.object,
  getColor: PropTypes.func,
  sellable: PropTypes.bool
};
