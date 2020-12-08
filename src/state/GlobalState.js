import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const history = useHistory();
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nick, setNick] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setNick(null)
    }
  }, [isLoggedIn])

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
        setNick: setNick
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
