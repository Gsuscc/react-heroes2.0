import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import Alert from "../components/alert/Alert";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [heroDetails, setHeroDetails] = useState();
  const [mergeHero, setMergeHero] = useState({});
  const [userDetails, setUserDetails] = useState({
    isLoggedIn: false,
    isFirstLogin: false,
    nick: null,
    balance: null,
  });
  const [initialized, setInitialized] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const addNewAlert = useCallback((message, color) => {
    let newAlert = <Alert color={color}>{message}</Alert>;
    setAlerts((alerts) => [...alerts, newAlert]);
    setTimeout(() => setAlerts((alerts) => [...alerts.slice(1)]), 3000);
  }, []);

  const resetStatus = () => {
    setUserDetails({
      isLoggedIn: false,
      isFirstLogin: false,
      nick: null,
      balance: null,
    });
  };

  const refreshUserDetails = useCallback(() => {
    axios
      .get("http://localhost:8762/api/user/status", {
        withCredentials: true,
      })
      .then((response) => {
        setUserDetails({
          isLoggedIn: true,
          isFirstLogin: false,
          nick: response.data.nick,
          balance: response.data.balance,
        });
        if (!initialized) setInitialized(true);
      })
      .catch((err) => {
        if (err.response.status === 501) {
          setUserDetails({
            isLoggedIn: true,
            isFirstLogin: true,
          });
        } else if (err.response.status === 403) {
          resetStatus();
        }
        if (!initialized) setInitialized(true);
      });
  }, [initialized, setInitialized]);

  return (
    <GlobalContext.Provider
      value={{
        heroDetails: heroDetails,
        setHeroDetails: setHeroDetails,
        mergeHero: mergeHero,
        setMergeHero: setMergeHero,
        alerts: alerts,
        addNewAlert: addNewAlert,
        userDetails: userDetails,
        refreshUserDetails: refreshUserDetails,
        initialized: initialized,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
