import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../state/GlobalState";
import HeroButton from "../misc/HeroButton";
import Card from "../card/Card";
import Loading from "../misc/Loading";
import Coin from "../misc/Coin";
import "./CardShop.css";
import CardDockDelayed from "../card/CardDockDelayed";
import { SoundContext } from "../../state/SoundState";
import PageTitle from "../header/PageTitle";
import CardContainer from "../card/CardContainer";
import LoginCheck from "../misc/LoginCheck";

const CardShop = (props) => {
  return (
    <LoginCheck>
      <CardShopComponent />
    </LoginCheck>
  );
};

const CardShopComponent = () => {
  const { refreshUserDetails, addNewAlert } = useContext(GlobalContext);
  const { playBuy } = useContext(SoundContext);
  const [isLoading, setIsLoading] = useState(false);
  const [heroesList, setHeroesList] = useState([]);

  const packs = [
    {
      name: "Bronze Pack",
      price: 1000,
      amount: 4,
      description: "4 regular cards",
    },
    {
      name: "Silver Pack",
      price: 3000,
      amount: 6,
      description: "includes 2 rare card",
    },
    {
      name: "Gold Pack",
      price: 8500,
      amount: 8,
      description: "includes 2 rare and 1 epic card",
    },
  ];

  const buyPack = (amount) => {
    if (!isLoading) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8762/api/user/buypack?pack=${amount}`, {
          withCredentials: true,
        })
        .then((response) => {
          playBuy();
          setHeroesList(response.data);
          setIsLoading(false);
          refreshUserDetails();
        })
        .catch((err) => {
          addNewAlert(err.response.data);
          console.log(err.response);
          setIsLoading(false);
        });
    }
  };

  return (
    <React.Fragment>
      <PageTitle>Card Shop</PageTitle>
      <div className="shop-pack-container">
        {packs.map((pack) => {
          return (
            <div className="shop-pack" key={pack.amount}>
              <div className={`shop-pack-name pack-${pack.amount}`}>
                {pack.name}
              </div>
              <div className="shop-pack-price">
                {pack.price} <Coin size={40} />
              </div>
              <div className="shop-pack-amount">{pack.amount} cards</div>
              <div className="shop-pack-description">{pack.description}</div>
              <HeroButton onClick={() => buyPack(pack.amount)}>
                PURCHASE
              </HeroButton>
            </div>
          );
        })}
      </div>
      <CardContainer>
        {heroesList.map((hero, index) => {
          return (
            <CardDockDelayed key={hero.uniqueId} delay={index * 300}>
              <Card
                hero={hero}
                isFlippable={true}
                isZoomable={true}
                isUserCard={true}
              />
            </CardDockDelayed>
          );
        })}
      </CardContainer>
      {isLoading && <Loading />}
    </React.Fragment>
  );
};

export default CardShop;
