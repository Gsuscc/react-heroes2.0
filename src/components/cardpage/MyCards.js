import React, { useEffect, useState, useRef } from 'react'
import Card from "../card/Card";
import axios from "axios";
import CardDock from '../card/CardDock';
import Loading from '../misc/Loading';
import PageTitle from '../header/PageTitle';

const MyCards = () => {

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
    axios.get(`http://localhost:8762/api/user/mycards?page=${page}`, {withCredentials: true})
      .then((response) => {
        let newHeroes = response.data.content;
        console.log(response.data)
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
    <div>
      {isLoading && <Loading />}
      <PageTitle>My Superhero Collection</PageTitle>
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
}

export default MyCards;