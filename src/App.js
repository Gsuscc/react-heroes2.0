import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeroList from './components/HeroList';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import Login from './components/auth/Login'
import Home from './components/home/Home'

const App = () => {

  return (    
    <Router>
      <Menu />
      <Header />
      <Switch>
        <Route exact path="/">
          <HeroList />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
