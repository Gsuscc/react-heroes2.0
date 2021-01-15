import React, { useCallback, useEffect, useState, useContext } from "react";
import LinearProgressWithLabel from "../misc/HeroBar";
import InfoText from "../misc/InfoText";
import PageTitle from "../header/PageTitle";
import CardDock from '../card/CardDock'
import "./Battle.css";
import Card from "../card/Card";
import { SoundContext } from "../../state/SoundState";

const Battle = (props) => {
  const fightLog = props.fightLog;
  const attackerNick = fightLog.myArmy.nick;
  const defenderNick = fightLog.enemyArmy.nick;
  const { playSlap, playPunch, playBox, playMiss, playTada, playStartFight, playWin} = useContext(SoundContext);
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
        setRounds((rounds) => [...rounds.slice(1)]);
      }, 2000);
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
    if(round.action === 'KILLED') {
      if (round.defender.attacker) {
        if(defenderCards.length > 0){
          defenderCard= defenderCards[0]
        }
        setDefenderCards((cards) => [...cards.slice(1)]);
        
      } else {
        if(attackerCards.length>0){
          attackerCard = attackerCards[0]
        }
        setAttackerCards((cards) => [...cards.slice(1)]);
        
      }
    }
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

  const getHitter = () => {
    return fightState.attackerCard.uniqueId === round.attacker.uniqueId ?
            fightState.attackerCard.name:
            fightState.defenderCard.name
  }

  const getDefender = () => {
    return fightState.defenderCard.uniqueId === round.defender.uniqueId ?
            fightState.defenderCard.name:
            fightState.attackerCard.name
  }

  const getActionColorClassName = () =>{
    if(fightState.action === 'KAPOW') return 'fight-action-kapow'
    if(fightState.action === 'POW') return 'fight-action-pow'
    if(fightState.action === 'MISS') return 'fight-action-miss'
    if(fightState.action === 'DOUBLE') return 'fight-action-double'
    if(fightState.action === 'BOOM') return 'fight-action-boom'
  }

  const getMessage = () => {
    if(fightState.action ==='KILLED') {
      return(
        <InfoText>
          <span key={fightState.damage} className="fight-log">
            New Fighter in the arena: 
            <span className="fighter-name new">{getHitter()}</span> 
            againts
            <span className="fighter-name">{getDefender()}</span> 
            <div><span className="fight-action-double"> Lets get ready to rumble!</span></div> 

            </span>
        </InfoText>)
        }
      if(fightState.action === 'STARTBATTLE'){
        return (
          <InfoText>
            <span key={fightState.damage} className="fight-log">
              A legendary battle is starting between: 
              <span className="fighter-name new">{getHitter()}</span> 
              and
              <span className="fighter-name new">{getDefender()}</span> 
              <div><span className="fight-action-double"> Lets get ready to rumble!</span></div> 
              </span>
        </InfoText>
        )
      }
      return ( 
        <InfoText>
          <span key={fightState.damage} className="fight-log">
            <span className="fighter-name">{getHitter()}</span> 
              <span className={round.defender.myHp > 0? 'hits': 'kills'}>{round.defender.myHp > 0? 'hits': 'kills'}
                  <span class="drop"></span>
                  <span class="drop"></span>
                  <span class="drop"></span>
                  <span class="drop"></span>
                  <span class="drop"></span>
              </span>
            <span className="fighter-name">{getDefender()}</span> 
              with a {" "} 
            <span className={`${getActionColorClassName()}`}>{fightState.action}</span> caused  <span className="damage">{fightState.damage}</span> damage
            </span>
        </InfoText>)
  }

  const getHitSound = useCallback((action) => {
    if(action === 'KAPOW') playPunch()
    if(action === 'POW') playSlap()
    if(action === 'DOUBLE') playBox()
    if(action === 'MISS') playMiss()
    if(action === 'KILLED') playTada()
    if(action === 'STARTBATTLE') playStartFight()
  }, [playBox, playSlap, playPunch, playMiss, playTada, playStartFight])

  const getWinner = () => {
    // playWin()
    if(fightState.attackerHp === 0) {
        return <InfoText><span className="win-message">{defenderNick} won the battle</span></InfoText> 
      // return hasUserCardByUniqueId(fightLog.myArmy.cards ,fightState.attackerCard.uniqueId) ?
      //               <InfoText><span className="win-message">{defenderNick} won the battle</span></InfoText> :
      //               <InfoText><span className="win-message">{attackerNick} won the battle</span></InfoText>
    }
    else{
        return <InfoText><span className="win-message">{attackerNick} won the battle</span></InfoText>
      // return hasUserCardByUniqueId(fightLog.myArmy.cards, fightState.defenderCard.uniqueId) ?
      //               <InfoText><span className="win-message">{attackerNick} won the battle</span></InfoText> :
      //               <InfoText><span className="win-message">{defenderNick} won the battle</span></InfoText>
    }
  }

  useEffect(() => {
    if(fightState) getHitSound(fightState.action)
  }, [fightState, getHitSound])

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
            </div>
          </div>
          <div className="fighter-container">
                  <CardDock key={fightState.attackerCard.uniqueId}>
                    <Card
                      hero={fightState.attackerCard}
                      isFlippable={true}
                      isZoomable={false}
                      isUserCard={true}
                      isRightClickabale={false}
                    />
                  </CardDock>
                  <CardDock key={fightState.defenderCard.uniqueId}>
                    <Card
                      hero={fightState.defenderCard}
                      isFlippable={true}
                      isZoomable={false}
                      isUserCard={true}
                      isRightClickabale={false}
                    />
                  </CardDock>
          </div>
          <div className="fight-log-container">
            {round && getMessage()}
            {!round && getWinner()}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Battle;
