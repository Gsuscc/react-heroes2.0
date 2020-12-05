import React from 'react';
import CardHeader from "./CardHeader";
import CardStats from "./CardStats";

const BackPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;

  return (
    <div class="card__face card__face--back">
      <div class="card-border">
        <div className="card-body">
          <CardHeader getColor={getColor} heroName={hero.name} />
          <div className="card-back-details">
            <CardStats powerStats={hero.powerstats} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackPage;