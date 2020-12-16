import React, { createContext, useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true)


  const addNewAlert = (message) => {
    setAlerts((alerts) => [...alerts, message]);
    setTimeout(() => setAlerts((alerts) => [...alerts.slice(1)]), 3000);
  };


  const refreshStatus = (callback = ()=>{}) => {
    return new Promise(() => {
        axios.get('http://localhost:8762/api/user/status', {withCredentials: true})
        .then((response) => {
          let data = response.data;
          setIsLoggedIn(true)
          setNick(data.nick)
          setIsLoading(false)
          setBalance(data.balance)
          callback(data)
        }).catch((err) => {
          let statusCode = err.response.status
          if (statusCode === 501) {
            setIsLoggedIn(true)
            history.push("/nick")
          } else {
            setIsLoggedIn(false)
          }
          setNick(null)
          setBalance(null)
          setIsLoading(false)
        });
    })
    }


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
        refreshStatus: refreshStatus
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
