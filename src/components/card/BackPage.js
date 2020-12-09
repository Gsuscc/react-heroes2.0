import React from 'react';
import CardButton from './CardButton';
import CardHeader from "./CardHeader";
import CardStats from "./CardStats";

const BackPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;
  const isUserCard = props.isUserCard;

  console.log(isUserCard)

  return (
    <div className="card__face card__face--back">
      <div className="card-border">
        <div className="card-body">
          <CardHeader getColor={getColor} heroName={hero.name} />
          <div className="card-back-details">
            <CardStats powerStats={hero.powerstats} />
            {isUserCard ? <CardButton>MERGE</CardButton> : <CardButton onClick={(e) => {
              e.stopPropagation()
              console.log('click')

              }}>ABOUT</CardButton>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackPage;