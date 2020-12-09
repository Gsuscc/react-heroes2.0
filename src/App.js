import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalState } from "./state/GlobalState";
import BuildState from './state/BuildState'
import HeroList from './components/HeroList';
import Header from './components/header/Header';
import UserInfo from './components/header/UserInfo';
import Menu from './components/menu/Menu';
import Login from './components/auth/Login'
import FirstLogin from './components/auth/FirstLogin'
import Home from './components/home/Home'
import CardShop from './components/store/CardShop'
import Registration from './components/auth/Registration';
import MyCards from './components/mycards/MyCards';
import HeroDetails from './components/details/HeroDetails';

const App = () => {

  return (    
    <Router>
      <GlobalState>
        <Menu />
        <Header />
        <UserInfo />
        <BuildState />
        <Switch>
          <Route path="/heroes" component={HeroList} />
          <Route path="/nick" component={FirstLogin} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/home" component={Home} />
          <Route path="/cardshop" component={CardShop} />
          <Route path="/mycards" component={MyCards} />
          <Route path="/details" component={HeroDetails} />
        </Switch>
      </GlobalState>
    </Router>
  );
}

export default App;
