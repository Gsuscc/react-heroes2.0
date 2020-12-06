import React, { useEffect, useState, useRef } from 'react'
import Card from "./card/Card";
import axios from "axios";
import './HeroList.css';
import CardDock from './card/CardDock';

const HeroList = () => {
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
    axios.get(`http://localhost:8762/api/hero/heroes?page=${page}`)
      .then((response) => {
        let newHeroes = response.data.content;
        setHeroesList(oldHeroes => [...oldHeroes, ...newHeroes])
        setIsLoading(false)
        if (response.data.last) {
          setHasMorePage(false)
        }
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)
      });
  }, [page])

  return (
    <div>
      <div className="hero-list-container">
        {heroesList.map((hero) => {
          return (
            <CardDock key={hero.id}>
              <Card hero={hero} isFlippable={true} isZoomable={true} key={hero.id}/>
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
      {isLoading.current ? <p className="heroFont">Loading...</p> : null}
      <div className="space"></div>
    </div>
  )
}

export default HeroList;
