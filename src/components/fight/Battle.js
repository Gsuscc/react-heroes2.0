import React, { useCallback, useEffect, useState } from "react";
import LinearProgressWithLabel from "../misc/HeroBar";
import InfoText from "../misc/InfoText";
import PageTitle from "../header/PageTitle";
import "./Battle.css";

const Battle = (props) => {
  const fightLog = props.fightLog;
  const attackerNick = fightLog.myArmy.nick;
  const defenderNick = fightLog.enemyArmy.nick;
  const [attackerCards, setAttackerCards] = useState(
    fightLog.myArmy.cards.slice(1)
  );
  const [defenderCards, setDefenderCards] = useState(
    fightLog.enemyArmy.cards.slice(1)
  );
  const [rounds, setRounds] = useState(fightLog.rounds);
  const [round, setRound] = useState(null);
  const [fightState, setFightState] = useState(null);

  useEffect(() => {
    setRound(rounds[0]);
    return () => {};
  }, [rounds]);

  useEffect(() => {
    if (round) {
      if (round.action === "STARTBATTLE") {
        initFightState();
      } else {
        updateFightState();
      }
    }

    let timeout;
    if (rounds.length > 0) {
      timeout = setTimeout(() => {
        if (round.defender.died) {
          if (round.attacker.attacker) {
            setFightState((state) => ({
              ...state,
              defenderCard: defenderCards[0],
            }));
            setDefenderCards((cards) => [...cards.slice(1)]);
          } else {
            setFightState((state) => ({
              ...state,
              attackerCard: attackerCards[0],
            }));
            setAttackerCards((cards) => [...cards.slice(1)]);
          }
        }
        setRounds((rounds) => [...rounds.slice(1)]);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [round]);

  const initFightState = useCallback(() => {
    setFightState({
      action: round.action,
      attackerHp: round.attacker.myHp,
      defenderHp: round.defender.myHp,
      attackerCard: fightLog.myArmy.cards[0],
      defenderCard: fightLog.enemyArmy.cards[0],
      damage: round.damage,
    });
  }, [fightLog, round]);

  const updateFightState = useCallback(() => {
    let attackerCard = fightState.attackerCard;
    let defenderCard = fightState.defenderCard;
    let attackerHp;
    let defenderHp;
    console.log(round.attacker.attacker);
    if (round.attacker.attacker) {
      attackerHp = round.attacker.myHp;
      defenderHp = round.defender.myHp;
    } else {
      attackerHp = round.defender.myHp;
      defenderHp = round.attacker.myHp;
    }
    setFightState({
      action: round.action,
      attackerHp: attackerHp,
      defenderHp: defenderHp,
      attackerCard: attackerCard,
      defenderCard: defenderCard,
      damage: round.damage,
    });
  }, [attackerCards, defenderCards, fightState, round]);

  console.log(round);
  return (
    <React.Fragment>
      <PageTitle>
        {attackerNick} VS {defenderNick}
      </PageTitle>
      {fightState && (
        <React.Fragment>
          <div className="battle-container">
            <div className="attacker-container">
              <InfoText>{fightState.attackerCard.name}</InfoText>
              <LinearProgressWithLabel
                value={
                  (fightState.attackerHp / fightState.attackerCard.stat.maxHp) *
                  100
                }
                labelToShow={
                  fightState.attackerHp +
                  " / " +
                  fightState.attackerCard.stat.maxHp
                }
              />
              <InfoText>
                AttackerCard:{" "}
                {round.attacker.attacker
                  ? round.attacker.uniqueId
                  : round.defender.uniqueId}{" "}
                + " - "{fightState.attackerCard.uniqueId}
              </InfoText>
              <InfoText>
                AttackerHp:{" "}
                {round.attacker.attacker
                  ? round.attacker.myHp
                  : round.defender.myHp}{" "}
                - {fightState.attackerHp}
              </InfoText>
            </div>

            <div className="defender-container">
              <InfoText>{fightState.defenderCard.name}</InfoText>
              <LinearProgressWithLabel
                value={
                  (fightState.defenderHp / fightState.defenderCard.stat.maxHp) *
                  100
                }
                labelToShow={
                  fightState.defenderHp +
                  " / " +
                  fightState.defenderCard.stat.maxHp
                }
              />
              <InfoText>
                AttackerCard:{" "}
                {round.defender.attacker
                  ? round.attacker.uniqueId
                  : round.defender.uniqueId}{" "}
                + " - "{fightState.defenderCard.uniqueId}
              </InfoText>
              <InfoText>
                AttackerHp:{" "}
                {round.defender.attacker
                  ? round.attacker.myHp
                  : round.defender.myHp}{" "}
                - {fightState.defenderHp}
              </InfoText>
            </div>
          </div>

          <InfoText>
            {round.attacker.uniqueId} - {fightState.action} -{" "}
            {round.defender.uniqueId} DMG {fightState.damage}
          </InfoText>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Battle;
