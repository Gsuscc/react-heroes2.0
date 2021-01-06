import React, { useCallback, useContext } from "react";
import { GlobalContext } from "../../state/GlobalState";
import Card from "../card/Card";
import CardDock from "../card/CardDock";
import CardDockDrag from "../card/CardDockDrag";
import CardDockMini from "../card/CardDockMini";
import HeroButton from "../misc/HeroButton";
import axios from 'axios';
import "./ArmySlot.css";
import { List } from "material-ui";

const ArmySlot = () => {
  const { army, setArmy } = useContext(GlobalContext);

  const resetSlots = useCallback(() => {
    setArmy([]);
  }, [setArmy]);

  const saveArmy = useCallback(()=>{
    axios
    .post(
      "http://localhost:8762/api/user/setarmy",
      {
        army: army.map(hero => hero.uniqueId)
      },
      { withCredentials: true }
    )
  },[army])

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
            />
          </CardDockMini>
        )}
      </div>
      <div className="button-container">
            <HeroButton onClick={saveArmy}>
                Save
            </HeroButton>
            <HeroButton onClick={resetSlots}>
                Reset
            </HeroButton>
      </div>
    </div>
  );
};
export default ArmySlot;
