import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeroList from './components/HeroList';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import Login from './components/login/Login'

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
        <Route path="/hero" component={null} />
      </Switch>
    </Router>
  );
}

export default App;
