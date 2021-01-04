import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../state/GlobalState";
import HeroButton from "../misc/HeroButton";
import Coin from "../misc/Coin";
import "./UserInfo.css";

export default function UserInfo() {
  const history = useHistory();
  const { userDetails } = useContext(GlobalContext);

  useEffect(() => {
    if (userDetails.isFirstLogin) {
      history.push("/nick");
    }
  }, [userDetails, history]);

  return (
    <React.Fragment>
      {userDetails.isLoggedIn && !userDetails.isFirstLogin && (
        <div className="userinfo-container">
          <div>Logged in as</div>
          <HeroButton onClick={() => history.push("/home")}>
            {userDetails.nick}
          </HeroButton>
          <div>Balance</div>
          <div className="userinfo-balance">
            {userDetails.balance}
            <Coin size={20} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
