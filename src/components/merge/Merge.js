import React, { useEffect, useState, useRef } from 'react'
import CardDock from '../card/CardDock';
import axios from 'axios';
import Loading from '../misc/Loading';
import PageTitle from '../header/PageTitle';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Card from '../card/Card';

 const Merge = (props) =>{
    const heroToMerge = props.location.state;
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [hasMorePage, setHasMorePage] = useState(true)
    const [heroesList, setHeroesList] = useState([]);
    const pageBottom = useRef();
    console.log("kitt")
    console.log(heroToMerge)

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
        console.log(heroToMerge)
        setIsLoading(true)
        setHasMorePage(false)
        axios.get(`http://localhost:8762/api/user/merge?cardId=${heroToMerge.cardid}&page=${page}`, {withCredentials: true})
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




    return (
        (
    <div>
      {isLoading && <Loading />}
      <PageTitle>Superhero Encyclopedia</PageTitle>
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
      <div className="hero-list-container">
        <CardDock >
            <Card hero={heroToMerge} isFlippable={true} isZoomable={true} />
        </CardDock>
      </div>
      <div className="hero-list-container">
        {heroesList.map((heroDetails) => {
          let hero = heroDetails.hero;
          return (
            <CardDock key={hero.heroId}>
              <Card hero={hero} isFlippable={true} isZoomable={true} isUserCard={true}/>
            </CardDock>
          )
        })}
      </div>
      <div
        className="scrollTrigger"
        ref={pageBottom}
        id="trigger"
        key="trigger"
      ></div>
      
    </div>
  )
    )
}
export default Merge
