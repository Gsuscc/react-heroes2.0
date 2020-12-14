import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../state/GlobalState';
import CardButton from './CardButton';
import CardHeader from "./CardHeader";
import CardStats from "./CardStats";

const BackPage = (props) => {
  const {setHeroDetails, setMergeHero, heroToMerge} = useContext(GlobalContext);
  const history = useHistory();
  const hero = props.hero;
  const getColor = props.getColor;
  const isUserCard = props.isUserCard;

  const userCardClickHandler = (e) => {
    //TODO
    setMergeHero(hero)
    e.stopPropagation()

  }

  const publicCardClickHandler = (e) => {
    e.stopPropagation()
    setHeroDetails(hero);
    history.push("/details");
  }

  return (
    <div className="card__face card__face--back">
      <div className={`card-border card-rarity-${hero.rarity.toLowerCase()}`}>
        <div className="card-body">
          <CardHeader getColor={getColor} heroName={hero.name} />
          <div className="card-back-details">
            <CardStats powerStats={hero.powerstats} />
            {isUserCard ? 
              <CardButton onClick={userCardClickHandler}>MERGE</CardButton> : 
              <CardButton onClick={publicCardClickHandler}>ABOUT</CardButton>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackPage;