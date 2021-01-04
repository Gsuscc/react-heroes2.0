import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

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
  const [alerts, setAlerts] = useState([]);

  const addNewAlert = useCallback((message) => {
    setAlerts((alerts) => [...alerts, message]);
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
      });
  }, []);

  // const refreshStatus = useCallback(() => {
  //   const statusRequest = axios.get("http://localhost:8762/api/user/status", {
  //     withCredentials: true,
  //   });
  //   return statusRequest
  //     .then((response) => {
  //       let data = response.data;
  //       setNick(data.nick);
  //       setBalance(data.balance);
  //       setIsLoggedIn(true);
  //       return "success";
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 501) {
  //         setNick(null);
  //         setBalance(null);
  //         setIsLoggedIn(true);
  //         return "firstlogin";
  //       } else if (err.response.status === 403) {
  //         resetStatus();
  //         return "accessdenied";
  //       }
  //       return "Communication error";
  //     });
  // }, [resetStatus]);

  const publicAllowedRoutes = React.useMemo(() => {
    return ["/login", "/", "/register", "/nick", "/about", "/details"];
  }, []);

  // const checkLoginState = useCallback(() => {
  //   if (isGuestUser() && !publicAllowedRoutes.includes(location.pathname)) {
  //     history.push("/login");
  //   } else if (isFirstLogin()) {
  //     history.push("/nick");
  //   }
  // }, [
  //   history,
  //   isFirstLogin,
  //   isGuestUser,
  //   location.pathname,
  //   publicAllowedRoutes,
  // ]);

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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
