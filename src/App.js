import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeroList from "./components/cardpage/HeroList";
import MyCards from "./components/cardpage/MyCards";
import Header from "./components/header/Header";
import UserInfo from "./components/header/UserInfo";
import Menu from "./components/menu/Menu";
import Login from "./components/auth/Login";
import FirstLogin from "./components/auth/FirstLogin";
import Home from "./components/home/Home";
import CardShop from "./components/store/CardShop";
import Registration from "./components/auth/Registration";
import HeroDetails from "./components/details/HeroDetails";
import About from "./components/about/About";
import Merge from "./components/merge/Merge";
import Alerts from "./components/alert/Alerts";
import { SoundState } from "./state/SoundState";
import PaddingContent from "./components/misc/PaddingContent";
import { GlobalContext } from "./state/GlobalState";
import Loading from "./components/misc/Loading";
import Arena from "./components/fight/Arena";

const App = () => {
  const { refreshUserDetails, initialized } = useContext(GlobalContext);

  useEffect(() => {
    refreshUserDetails();
  }, [refreshUserDetails]);

  return (
    <React.Fragment>
      {!initialized ? (
        <Loading />
      ) : (
        <Router>
          <SoundState>
            <Alerts />
            <Menu />
            <Header />
            <UserInfo />
            <Switch>
              <Route path="/details" component={HeroDetails} />
              <PaddingContent>
                <Route exact path="/" component={HeroList} />
                <Route path="/nick" component={FirstLogin} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Registration} />
                <Route path="/about" component={About} />
                <Route path="/home" component={Home} />
                <Route path="/cardshop" component={CardShop} />
                <Route path="/mycards" component={MyCards} />
                <Route path="/merge" component={Merge} />
                <Route path="/arena" component={Arena} />
              </PaddingContent>
            </Switch>
          </SoundState>
        </Router>
      )}
    </React.Fragment>
  );
};

export default App;
