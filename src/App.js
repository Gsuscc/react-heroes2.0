import React from 'react'
import HeroList from './components/HeroList';
import Header from './components/header/Header';

const App = () => {

  return (    
    <React.Fragment>
      <Header />
      <HeroList />
    </React.Fragment>

  );
}

export default App;
