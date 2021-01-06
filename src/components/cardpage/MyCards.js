import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import Card from "../card/Card";
import axios from "axios";
import CardDock from "../card/CardDock";
import Loading from "../misc/Loading";
import PageTitle from "../header/PageTitle";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { GlobalContext } from "../../state/GlobalState";
import InfoText from "../misc/InfoText";
import CardContainer from "../card/CardContainer";
import LoginCheck from "../misc/LoginCheck";
import ArmySlot from "./ArmySlot";
import Button from "@material-ui/core/Button";
import HeroButton from "../misc/HeroButton";

const MyCards = (props) => {
  return (
    <LoginCheck>
      <MyCardsComponent />
    </LoginCheck>
  );
};

const MyCardsComponent = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [heroesList, setHeroesList] = useState([]);
  const pageBottom = useRef();
  const { addNewAlert, setArmy } = useContext(GlobalContext);
  const [isArmySlotVisible, setIsArmySlotVisible] = useState(false);

  const toggleSlots = useCallback(() => {
    setIsArmySlotVisible(!isArmySlotVisible);
  }, [isArmySlotVisible]);

  const resetSlots = useCallback(() => {
    setArmy([]);
  }, [setArmy]);

  useEffect(() => {
    const toggleDiv = pageBottom.current;
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      if (isLoading) return;
      setPage((page) => ++page);
    });
    if (hasMorePage) {
      intersectionObserver.observe(toggleDiv);
    }
    return () => intersectionObserver.disconnect(toggleDiv);
  }, [isLoading, hasMorePage]);

  useEffect(() => {
    setIsLoading(true);
    setHasMorePage(false);
    axios
      .get(`http://localhost:8762/api/user/mycards?page=${page}`, {
        withCredentials: true,
      })
      .then((response) => {
        let newHeroes = response.data.content;
        setHeroesList((oldHeroes) => [...oldHeroes, ...newHeroes]);
        setIsLoading(false);
        if (response.data.last === false) {
          setHasMorePage(true);
        }
      })
      .catch((err) => {
        addNewAlert(err.response.data.error);
        console.log(err.response);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <React.Fragment>
      <ScrollUpButton
        StopPosition={0}
        ShowAtPosition={150}
        EasingType="easeOutCubic"
        AnimationDuration={500}
        ContainerClassName="ScrollUpButton__Container"
        TransitionClassName="ScrollUpButton__Toggled"
        style={{ backgroundColor: "orange" }}
        ToggledStyle={{ right: 60 }}
      />
      {isLoading && <Loading />}
      <PageTitle>My Superhero Collection</PageTitle>
      <CardContainer>
        {heroesList.length > 0
          ? heroesList.map((hero) => {
              return (
                <CardDock key={hero.uniqueId}>
                  <Card
                    hero={hero}
                    isFlippable={true}
                    isZoomable={true}
                    isUserCard={true}
                    isRightClickabale={true}
                  />
                </CardDock>
              );
            })
          : !isLoading && (
              <InfoText>No cards, go to Shop to collect'em</InfoText>
            )}
        {isArmySlotVisible && <ArmySlot />}
      </CardContainer>
      <div class="bounce bottom-left-corner">
        <HeroButton onClick={toggleSlots}>
          {isArmySlotVisible ? "Hide Army" : "Show Army"}
        </HeroButton>
      </div>
      <div
        className="scrollTrigger"
        ref={pageBottom}
        id="trigger"
        key="trigger"
      ></div>
    </React.Fragment>
  );
};

export default MyCards;
