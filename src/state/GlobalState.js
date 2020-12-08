import React, { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nick, setNick] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        loginStatus: [isLoggedIn, setIsLoggedIn],
        nickName: [nick, setNick],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
