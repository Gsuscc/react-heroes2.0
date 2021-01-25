import React, { useCallback, useContext } from "react";
import { GlobalContext } from "../../state/GlobalState";
import Card from "../card/Card";
import CardDockMini from "../card/CardDockMini";
import HeroButton from "../misc/HeroButton";
import axios from "axios";
import "./ArmySlot.css";

const ArmySlot = (props) => {
  const army = props.army;
  const setArmy = props.setArmy;
  const { addNewAlert } = useContext(GlobalContext);

  const resetSlots = useCallback(() => {
    setArmy([]);
  }, [setArmy]);

  const saveArmy = useCallback(() => {
    if (army.length !== 5) addNewAlert("Need exacly 5 card!");
    else
      axios
        .post(
          "http://localhost:8762/api/user/setarmy",
          {
            army: army.map((hero) => hero.uniqueId),
          },
          { withCredentials: true }
        )
        .then(addNewAlert("Army saved successfully!", "green"))
        .catch("Error while saving army");
  }, [army, addNewAlert]);

  return (
    <div className="slots">
      <div className="slot">
        {!army[0] ? (
          "Empty"
        ) : (
          <CardDockMini>
            <Card
              hero={army[0]}
              isFlippable={false}
              isZoomable={false}
              isUserCard={true}
              isRightClickabale={true}
              army={army}
              setArmy={setArmy}
            />
          </CardDockMini>
        )}
      </div>
      <div className="slot">
        {!army[1] ? (
          "Empty"
        ) : (
          <CardDockMini>
            <Card
              hero={army[1]}
              isFlippable={false}
              isZoomable={false}
              isUserCard={true}
              isRightClickabale={true}
              army={army}
              setArmy={setArmy}
            />
          </CardDockMini>
        )}
      </div>
      <div className="slot">
        {!army[2] ? (
          "Empty"
        ) : (
          <CardDockMini>
            <Card
              hero={army[2]}
              isFlippable={false}
              isZoomable={false}
              isUserCard={true}
              isRightClickabale={true}
              army={army}
              setArmy={setArmy}
            />
          </CardDockMini>
        )}
      </div>
      <div className="slot">
        {!army[3] ? (
          "Empty"
        ) : (
          <CardDockMini>
            <Card
              hero={army[3]}
              isFlippable={false}
              isZoomable={false}
              isUserCard={true}
              isRightClickabale={true}
              army={army}
              setArmy={setArmy}
            />
          </CardDockMini>
        )}
      </div>
      <div className="slot">
        {!army[4] ? (
          "Empty"
        ) : (
          <CardDockMini>
            <Card
              hero={army[4]}
              isFlippable={false}
              isZoomable={false}
              isUserCard={true}
              isRightClickabale={true}
              army={army}
              setArmy={setArmy}
            />
          </CardDockMini>
        )}
      </div>
      <div className="button-container">
        <HeroButton onClick={saveArmy}>Save</HeroButton>
        <HeroButton onClick={resetSlots}>Reset</HeroButton>
      </div>
    </div>
  );
};
export default ArmySlot;
