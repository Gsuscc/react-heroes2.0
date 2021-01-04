import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Loading from "../misc/Loading";
import { GlobalContext } from "../../state/GlobalState";
import PageTitle from "../header/PageTitle";
import VanillaTilt from "vanilla-tilt";
import "./Home.css";
import LoginCheck from "../misc/LoginCheck";

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return (
    <div ref={tilt} {...rest}>
      {props.children}
    </div>
  );
}

const Home = (props) => {
  return (
    <LoginCheck>
      <HomeComponent />
    </LoginCheck>
  );
};

const HomeComponent = () => {
  const { addNewAlert } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    nick: null,
    email: null,
    balance: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8762/api/user/mydetails", {
        withCredentials: true,
      })
      .then((response) => {
        let data = response.data;
        setDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        addNewAlert(err.response.data.error);
        setIsLoading(false);
      });
  }, [addNewAlert]);

  const options = {
    scale: 1.2,
    speed: 1000,
    max: 30,
  };

  return (
    <React.Fragment>
      <PageTitle>My Profile</PageTitle>
      {isLoading && <Loading />}
      {!isLoading && (
        <Tilt className="home-profile-container" options={options}>
          <div className="dotted three-d-layer">
            <div className="home-profile-entry home-profile-key">User Id</div>
            <div className="home-profile-entry home-profile-value">
              {details.id}
            </div>
            <div className="home-profile-entry home-profile-key">Nick</div>
            <div className="home-profile-entry home-profile-value">
              {details.nick}
            </div>
            <div className="home-profile-entry home-profile-key">Email</div>
            <div className="home-profile-entry home-profile-value">
              {details.email}
            </div>
            <div className="home-profile-entry home-profile-key">Balance</div>
            <div className="home-profile-entry home-profile-value">
              {details.balance}
            </div>
            <div className="home-profile-entry home-profile-key">
              Total Cards
            </div>
            <div className="home-profile-entry home-profile-value">
              {details.totalCardsNumber}
            </div>
          </div>
        </Tilt>
      )}
    </React.Fragment>
  );
};

export default Home;
