import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const history = useHistory();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nick, setNick] = useState(null);
  const [balance, setBalance] = useState(null)
  const [heroDetails, setHeroDetails] = useState();
  const [mergeHero, setMergeHero] = useState({});

  useEffect(() => {
    if (!isLoggedIn) {
      setNick(null)
      setBalance(null)
    } else {
      refreshBalance()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (nick != null) {
      refreshBalance();
    }
  }, [nick])

  const refreshBalance = () => {
    axios.get(`http://localhost:8762/api/user/balance`, {withCredentials: true})
    .then((response) => {
      setBalance(response.data.balance)
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    if (isReady) {
      if (isLoggedIn && nick !== null) history.push('/heroes')
      if (isLoggedIn && nick === null) history.push('/nick')
      if (!isLoggedIn) history.push('/heroes')
    }

    return () => {
    }
  }, [isLoggedIn, nick, history, isReady])

  return (
    <GlobalContext.Provider
      value={{
        isReady: isReady,
        setIsReady: setIsReady,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        nick: nick,
        setNick: setNick,
        balance: balance,
        refreshBalance: refreshBalance,
        heroDetails: heroDetails,
        setHeroDetails: setHeroDetails,
        mergeHero: mergeHero,
        setMergeHero: setMergeHero
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
