import React from 'react';
import CardHeader from "./CardHeader";

const BackPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;

  return (
    <div class="card__face card__face--back">
      <div class="card-border">
        <div className="card-body dotted">
          <CardHeader getColor={getColor} heroName={hero.name} />
          BACKPAGE
        </div>
      </div>
    </div>
  )
}

export default BackPage;