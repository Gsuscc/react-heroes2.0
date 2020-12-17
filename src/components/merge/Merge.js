import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Loading from "../misc/Loading";
import PageTitle from "../header/PageTitle";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Card from "../card/Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardDockDrag from "../card/CardDockDrag";
import CardDockDrop from "../card/CardDockDrop";
import LevelUp from "../misc/LevelUp";
import { GlobalContext } from "../../state/GlobalState";
import InfoText from "../misc/InfoText";
import { SoundContext } from "../../state/SoundState";
import CardContainer from "../card/CardContainer";

const Merge = (props) => {
  const { addNewAlert } = useContext(GlobalContext);
  const [heroToMerge, setHeroToMerge] = useState(props.location.state);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [heroesList, setHeroesList] = useState([]);
  const pageBottom = useRef();
  const [isLevelUp, setIsLevelUp] = useState(false);
  const { playLevelUp } = useContext(SoundContext);

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
      .get(
        `http://localhost:8762/api/user/merge?uniqueId=${heroToMerge.uniqueId}&page=${page}`,
        { withCredentials: true }
      )
      .then((response) => {
        let newHeroes = response.data.content;
        setHeroesList((oldHeroes) => [...oldHeroes, ...newHeroes]);
        setIsLoading(false);
        if (response.data.last === false) {
          setHasMorePage(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
        addNewAlert(err.response.data.error);
        setIsLoading(false);
      });
  }, [page]);

  const levelUp = (newLevel) => {
    playLevelUp();
    setIsLevelUp(true);
    setTimeout(() => {
      setIsLevelUp(false);
    }, 4000);
    console.log("Level up: " + newLevel);
  };

  const onDrop = (hero) => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8762/api/user/mergecard?mergeInto=${heroToMerge.uniqueId}&merging=${hero.uniqueId}`,
        { withCredentials: true }
      )
      .then((response) => {
        if (heroToMerge.level < response.data.level)
          levelUp(response.data.level);
        setIsLoading(false);
        setHeroToMerge(response.data);
        if (page === 0)
          setHeroesList((heroes) =>
            heroes.filter((x) => x.uniqueId !== hero.uniqueId)
          );
        else {
          setHeroesList([]);
          setPage(0);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        addNewAlert(err.response.data.error);
        console.log(err.response);
      });
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {isLevelUp && <LevelUp />}
      <PageTitle>Drag cards to update</PageTitle>
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

      <DndProvider backend={HTML5Backend}>
      <CardContainer>
          <CardDockDrop onDrop={onDrop} hero={heroToMerge}>
            <Card
              hero={heroToMerge}
              isFlippable={true}
              isZoomable={true}
              isUserCard={true}
            />
          </CardDockDrop>
          </CardContainer>
        <CardContainer>
          {heroesList.length > 0 ? (
            heroesList.map((hero) => {
              return (
                <CardDockDrag key={hero.uniqueId} hero={hero}>
                  <Card hero={hero} isUserCard={true} />
                </CardDockDrag>
              );
            })
          ) : (
            <InfoText>No hero to merge</InfoText>
          )}
        </CardContainer>
      </DndProvider>

      <div
        className="scrollTrigger"
        ref={pageBottom}
        id="trigger"
        key="trigger"
      />
    </React.Fragment>
  );
};
export default Merge;
