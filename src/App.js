import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeroList from './components/HeroList';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import Login from './components/auth/Login'
import FirstLogin from './components/auth/FirstLogin'
import Home from './components/home/Home'
import BuildState from './state/BuildState'
import { GlobalState } from "./state/GlobalState";

const App = () => {

  return (    
    <Router>
      <GlobalState>
        <Menu />
        <Header />
        <BuildState />
        <Switch>
          <Route path="/heroes" component={HeroList} />
          <Route path="/nick" component={FirstLogin} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </GlobalState>
    </Router>
  );
}

export default App;
