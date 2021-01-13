import { HardwareDeveloperBoard } from "material-ui/svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import LinearProgressWithLabel from "../misc/HeroBar";

const Battle = (props) => {
  const fightLog = props.fightLog;
  const attackerNick = fightLog.myArmy.nick;
  const defenderNick = fightLog.enemyArmy.nick;
  const [attackerCards, setAttackerCards] = useState(fightLog.myArmy.cards.slice(1));
  const [defenderCards, setDefenderCards] = useState(fightLog.enemyArmy.cards.slice(1));
  const [rounds, setRounds] = useState(fightLog.rounds);
  const round = rounds[0];
  const [fightState, setFightState] = useState({
    attackerCard: fightLog.myArmy.cards[0],
    defenderCard: fightLog.enemyArmy.cards[0],
    attackerHp: round.attacker.myHp,
    defenderHp: round.defender.myHp,
    action: null,
    damage: null
  })

  const updateFightState = useCallback(() => {
    let attackerCard = fightState.attackerCard
    let defenderCard = fightState.defenderCard
    let attackerHp
    let defenderHp
    if(round.attacker.attacker) {
       attackerHp = round.attacker.myHp;
       defenderHp = round.defender.myHp;
       if(round.defender.died){
          defenderCard = defenderCards[0]
          setDefenderCards((cards) => defenderCards.filter((card) => card.uniqueId !== round.defender.uniqueId) )
          console.log(defenderCards)
       }
    }
    else{
      attackerHp = round.defender.myHp;
      defenderHp = round.attacker.myHp;
      if(round.defender.died) {
          attackerCard = attackerCards[0]
          setAttackerCards((cards) => attackerCards.filter((card) => card.uniqueId !== round.defender.uniqueId) )
      }
    }

    setFightState({
      action:round.action, 
      attackerHp: attackerHp, 
      defenderHp: defenderHp,
      attackerCard: attackerCard,
      defenderCard: defenderCard,
      damage: round.damage
    })
  }, [attackerCards, defenderCards, fightState, round])

  useEffect(() => {
    let nextRound;
    if (rounds.length > 0) {
      nextRound = setTimeout(() => {
        updateFightState()
        setRounds((rounds) => [...rounds.slice(1)]);
      }, 3000);
    }
    return () => {
      clearTimeout(nextRound);
    };
  }, [rounds, updateFightState]);

  




  return <div>
          <div className='attacker-container'>
            <LinearProgressWithLabel value={100}/>
          </div>

          <div className='defender-container'>
            <LinearProgressWithLabel value={100}/>
          </div>
    
        </div>;
};

export default Battle;
