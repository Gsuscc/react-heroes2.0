import React, { useEffect, useState } from "react";

const Battle = (props) => {
  const fightLog = props.fightLog;
  const attackerNick = fightLog.myArmy.nick;
  const defenderNick = fightLog.enemyArmy.nick;
  const attackerCards = fightLog.myArmy.cards;
  const defenderCards = fightLog.enemyArmy.cards;
  const [rounds, setRounds] = useState(fightLog.rounds);
  const [attackerCard, setAttackerCard] = useState();
  const [defenderCard, setDefenderCard] = useState();
  const round = rounds[0];

  useEffect(() => {
    let nextRound;
    if (rounds.length > 0) {
      nextRound = setTimeout(() => {
        setRounds((rounds) => [...rounds.slice(1)]);
      }, 3000);
    }
    return () => {
      clearTimeout(nextRound);
    };
  }, [rounds]);

  console.log(round);

  return <div></div>;
};

export default Battle;
