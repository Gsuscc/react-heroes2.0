/* eslint-disable react-hooks/exhaustive-deps */
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
import HeroButton from "../misc/HeroButton";
import { MyCardContext } from "../../state/MyCardState";

const MyCards = (props) => {
  return (
    <LoginCheck>
        <MyCardsComponent />
    </LoginCheck>
  );
};

const MyCardsComponent = (props) => {
  const pageBottom = useRef();
  const { addNewAlert } = useContext(GlobalContext);
  const {
    isLoading,
    setIsLoading, 
    page, 
    setPage, 
    heroesList, 
    setHeroesList, 
    hasMorePage, 
    setHasMorePage
  } = useContext(MyCardContext)
  const [isArmySlotVisible, setIsArmySlotVisible] = useState(false);
  const [army, setArmy] = useState(null);

  console.log(MyCardContext)
  console.log(heroesList)

  const toggleSlots = useCallback(() => {
    setIsArmySlotVisible(!isArmySlotVisible);
  }, [isArmySlotVisible]);

  useEffect(() => {
    axios
      .get(`http://localhost:8762/api/user/myarmy`, {
        withCredentials: true,
      })
      .then((response) => {
        let army = response.data;
        setArmy(army);
      })
      .catch((err) => {
        addNewAlert("Error while retrieving army");
      });
  }, [setArmy, addNewAlert]);


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
        // addNewAlert("Error while loading cards");
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
                    isSellable = {true}
                    army={army}
                    setArmy={setArmy}
                  />
                </CardDock>
              );
            })
          : !isLoading && (
              <InfoText>No cards, go to Shop to collect'em</InfoText>
            )}
        {isArmySlotVisible && <ArmySlot army={army} setArmy={setArmy} />}
      </CardContainer>
      {army !== null && (
        <div class="bounce bottom-left-corner">
          <HeroButton onClick={toggleSlots}>
            {isArmySlotVisible ? "Hide Army" : "Show Army"}
          </HeroButton>
        </div>
      )}

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
