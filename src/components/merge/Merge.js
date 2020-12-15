import React, { useEffect, useState, useRef } from 'react'
import CardDock from '../card/CardDock';
import axios from 'axios';
import Loading from '../misc/Loading';
import PageTitle from '../header/PageTitle';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Card from '../card/Card';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CardDockDrag from '../card/CardDockDrag';
import CardDockDrop from '../card/CardDockDrop';

 const Merge = (props) => {
    const [heroToMerge, setHeroToMerge] = useState(props.location.state);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [hasMorePage, setHasMorePage] = useState(true)
    const [heroesList, setHeroesList] = useState([]);
    const pageBottom = useRef();

    useEffect(() => {
        const toggleDiv = pageBottom.current;
        const intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio <= 0) return;
          if (isLoading) return;
          setPage((page) => ++page);
        })
        if (hasMorePage) {
          intersectionObserver.observe(toggleDiv);
        }
        return () => intersectionObserver.disconnect(toggleDiv);
      }, [isLoading, hasMorePage])


    useEffect(() => {
        setIsLoading(true)
        setHasMorePage(false)
        axios.get(`http://localhost:8762/api/user/merge?uniqueId=${heroToMerge.uniqueId}&page=${page}`, {withCredentials: true})
          .then((response) => {
            let newHeroes = response.data.content;
            setHeroesList(oldHeroes => [...oldHeroes, ...newHeroes])
            setIsLoading(false)
            if (response.data.last === false) {
              setHasMorePage(true)
            }
          }).catch((err) => {
            console.log(err)
            setIsLoading(false)
          });
      }, [page])

    const levelUp = (newLevel) => {
      // todo
      console.log("Level up: " + newLevel)
    }

    const onDrop = (hero) => {
      setIsLoading(true)
      axios.get(`http://localhost:8762/api/user/mergecard?mergeInto=${heroToMerge.uniqueId}&merging=${hero.uniqueId}`, {withCredentials: true})
      .then(response => {
        if (heroToMerge.level < response.data.level) levelUp(response.data.level)
        setIsLoading(false)
        setHeroToMerge(response.data);
        if (page === 0) setHeroesList((heroes) => heroes.filter(x => x.uniqueId !== hero.uniqueId))
        else {
          setHeroesList([]);
          setPage(0);
        }
        
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err.response)
      })
    }

    return (
        (
    <div>
      {isLoading && <Loading />}
      <PageTitle>Drag cards to update</PageTitle>
      <ScrollUpButton
      StopPosition={0}
      ShowAtPosition={150}
      EasingType='easeOutCubic'
      AnimationDuration={500}
      ContainerClassName='ScrollUpButton__Container'
      TransitionClassName='ScrollUpButton__Toggled'
      style={{backgroundColor: 'orange'}}
      ToggledStyle={{right: 60}}
    />

    <DndProvider backend={HTML5Backend}>
      <div className="hero-list-container">
        <CardDockDrop onDrop={onDrop}>
            <Card hero={heroToMerge} isFlippable={true} isZoomable={true} isUserCard={true} />
        </CardDockDrop>
      </div>
      <div className="hero-list-container">
        {heroesList.length > 0 ? heroesList.map((hero) => {
          return (
            <CardDockDrag key={hero.uniqueId} hero={hero}>
              <Card hero={hero} isUserCard={true}/>
            </CardDockDrag>
          )
        }) : "No hero to merge"}
      </div>
    </DndProvider>

    <div
      className="scrollTrigger"
      ref={pageBottom}
      id="trigger"
      key="trigger"
    />
      
    </div>
  )
    )
}
export default Merge;
