import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../state/GlobalState';
import Card from '../card/Card';
import CardContainer from '../card/CardContainer';
import CardDock from '../card/CardDock';
import HeroButton from '../misc/HeroButton';
import InfoText from '../misc/InfoText';
import Loading from '../misc/Loading';
import LoginCheck from '../misc/LoginCheck';

const Arena = (props) => {
    return (
      <LoginCheck>
        <ArenaComponent />
      </LoginCheck>
    );
  };

const ArenaComponent = () => {
    const [myArmy, setMyArmy] = useState()
    const [enemyArmy, setEnemyArmy] = useState();
    const {addNewAlert} =useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [fightLog, setFightLog] = useState();
    

    useEffect(()=>{
        axios.get("http://localhost:8762/api/fight/getfight", {
            withCredentials: true,
          })
        .then(response =>{
            setMyArmy(response.data.myArmy)
            setEnemyArmy(response.data.enemyArmy)
            setIsLoading(false)
        })
        .catch((err) => {
            addNewAlert('valami')
            console.log(err);
            setIsLoading(false)
        })
 
    },[addNewAlert]);

    const getNewEnemyHandler= () => {
        setIsLoading(true)
        axios.get("http://localhost:8762/api/fight/getenemy", {
            withCredentials: true,
          })
          .then(response =>{
            setEnemyArmy(response.data)
            setIsLoading(false)
        })
        .catch((err) => {
            addNewAlert('valami2')
            console.log(err);
            setIsLoading(false)
        })
    }

    const startBattleHandler= () => {
        setIsLoading(true)
        axios.get("http://localhost:8762/api/fight/startfight", {
            withCredentials: true,
          })
          .then(response =>{
            setFightLog(response.data)
            console.log(fightLog)
            setIsLoading(false)
        })
        .catch((err) => {
            addNewAlert('valami3')
            console.log(err);
            setIsLoading(false)
        })
    }

    return (
        <React.Fragment>
            {isLoading ? <Loading /> :
            <React.Fragment>
                <InfoText>{myArmy.nick}'s Army</InfoText>
                <CardContainer>
                    {myArmy.cards.map((hero) => {
                        return  (
                            <CardDock key={hero.uniqueId}>
                            <Card
                                hero={hero}
                                isFlippable={true}
                                isZoomable={true}
                                isUserCard={true}
                                isRightClickabale={false}
                            />
                            </CardDock>
                        );
                        })
                    }
                </CardContainer> 
                <HeroButton onClick={getNewEnemyHandler}>New Enemy</HeroButton>
                {enemyArmy && 
                <React.Fragment>
                    <HeroButton onClick={startBattleHandler}>Start Battle</HeroButton>
                    <InfoText>{enemyArmy.nick}'s Army</InfoText>
                    <CardContainer>
                        {enemyArmy.cards.map((hero) => {
                            return  (
                                <CardDock key={hero.uniqueId}>
                                <Card
                                    hero={hero}
                                    isFlippable={true}
                                    isZoomable={true}
                                    isUserCard={true}
                                    isRightClickabale={false}
                                />
                                </CardDock>
                            );
                            })
                        }
                    </CardContainer> 
                </React.Fragment>
                }
                
                </React.Fragment>}
      </React.Fragment>
    )
}
export default Arena;
