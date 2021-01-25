import axios from "axios";
import React, { createRef, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../state/GlobalState";
import Card from "../card/Card";
import CardContainer from "../card/CardContainer";
import CardDock from "../card/CardDock";
import HeroButton from "../misc/HeroButton";
import InfoText from "../misc/InfoText";
import Loading from "../misc/Loading";
import LoginCheck from "../misc/LoginCheck";
import Battle from "./Battle";
import './Arena.css'


const Arena = (props) => {
  return (
    <LoginCheck>
      <ArenaComponent />
    </LoginCheck>
  );
};

const fillRefs = (arrRef) =>{
  arrRef.current = Array(5).fill().map(
    (ref, index) =>   arrRef.current[index] = createRef()
  )
}

const ArenaComponent = () => {
  const [myArmy, setMyArmy] = useState();
  const [enemyArmy, setEnemyArmy] = useState();
  const { addNewAlert } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fightLog, setFightLog] = useState();
  const [isBattle, setIsBattle] = useState(false);
  const defenderCards = useRef([])
  const attackerCards = useRef([])

  useEffect(() => {
    axios
      .get("http://localhost:8762/api/fight/getfight", {
        withCredentials: true,
      })
      .then((response) => {
        setMyArmy(response.data.myArmy);
        setEnemyArmy(response.data.enemyArmy);
        setIsLoading(false);
      })
      .catch((err) => {
        addNewAlert("valami");
        console.log(err);
        setIsLoading(false);
      });
  }, [addNewAlert]);

  const getNewEnemyHandler = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8762/api/fight/getenemy", {
        withCredentials: true,
      })
      .then((response) => {
        setEnemyArmy(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        addNewAlert("valami2");
        console.log(err);
        setIsLoading(false);
      });
  };

  const startBattleHandler = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8762/api/fight/startfight", {
        withCredentials: true,
      })
      .then((response) => {
        setFightLog(response.data);
        console.log(fightLog);
        setIsLoading(false);
        setIsBattle(true);
      })
      .catch((err) => {
        addNewAlert("valami3");
        console.log(err);
        setIsLoading(false);
      });
  };

  fillRefs(attackerCards);
  fillRefs(defenderCards);

  const flipAll = (arrRef) => {
    arrRef.current.forEach((el, i) => {
      setTimeout(() => el.current.firstChild.click(), i*150)
  }
    )
  }

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && isBattle && <Battle fightLog={fightLog} />}
      {!isLoading && !isBattle && (
        <React.Fragment>
          <div className="bounce upper-left-corner"><HeroButton onClick={() => flipAll(attackerCards)}>Flip all</HeroButton></div>
          <InfoText>{myArmy.nick}'s Army</InfoText>
          <div className="army-container">
            {myArmy.cards.map((hero, i) => {
              return (
                <CardDock key={hero.uniqueId}>
                  <div ref={attackerCards.current[i]}>
                   <Card
                    hero={hero}
                    isFlippable={true}
                    isZoomable={true}
                    isUserCard={true}
                    isRightClickabale={false}
                  /> 
                  </div>
                </CardDock>
              );
            })}
          </div>
          <HeroButton onClick={getNewEnemyHandler}>New Enemy</HeroButton>
          {enemyArmy && (
            <React.Fragment>
              <HeroButton onClick={startBattleHandler}>Start Battle</HeroButton>
              <div className="bounce bottom-left-corner"><HeroButton onClick={() => flipAll(defenderCards)}>Flip all</HeroButton></div>
              <InfoText>{enemyArmy.nick}'s Army</InfoText>
              <div className="army-container">
                {enemyArmy.cards.map((hero,i ) => {
                  return (
                    <CardDock key={hero.uniqueId}>
                      <div ref={defenderCards.current[i]}><Card
                        hero={hero}
                        isFlippable={true}
                        isZoomable={true}
                        isUserCard={true}
                        isRightClickabale={false}
                      />
                      </div> 
                    </CardDock>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Arena;
