import React, { createContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nick, setNick] = useState(null);
  const [balance, setBalance] = useState(null);
  const [heroDetails, setHeroDetails] = useState();
  const [mergeHero, setMergeHero] = useState({});
  const [alerts, setAlerts] = useState([]);

  const addNewAlert = (message) => {
    setAlerts((alerts) => [...alerts, message]);
    setTimeout(() => setAlerts((alerts) => [...alerts.slice(1)]), 3000);
  };

  const checkLoginState = useCallback(
    () => {
      if(!isLoggedIn) history.push('/login')
    },
    [isLoggedIn, history]
  ) 

  const refreshStatus = useCallback(() => {
    const statusRequest = axios.get("http://localhost:8762/api/user/status", {
      withCredentials: true,
    });
    return statusRequest
      .then((response) => {
        let data = response.data;
        setIsLoggedIn(true);
        setNick(data.nick);
        setBalance(data.balance);
        return data;
      })
      .catch((err) => {
        let statusCode = err.response.status;
        if (statusCode === 501) {
          setIsLoggedIn(true);
          history.push("/nick");
        } else {
          setIsLoggedIn(false);
        }
        setNick(null);
        setBalance(null);
        return err;
      });
  }, [history]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        nick: nick,
        setNick: setNick,
        balance: balance,
        heroDetails: heroDetails,
        setHeroDetails: setHeroDetails,
        mergeHero: mergeHero,
        setMergeHero: setMergeHero,
        alerts: alerts,
        addNewAlert: addNewAlert,
        refreshStatus: refreshStatus,
        checkLoginState: checkLoginState
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
