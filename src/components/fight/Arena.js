import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../state/GlobalState';
import Card from '../card/Card';
import CardContainer from '../card/CardContainer';
import CardDock from '../card/CardDock';
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


    console.log(myArmy)
    console.log(enemyArmy)
    return (
        <React.Fragment>
            {isLoading ? <Loading /> :
            <div>
                <CardContainer>
                    {myArmy.cards.map((hero) => {
                        console.log(hero)
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
                </div>}
      </React.Fragment>
    )
}
export default Arena;
