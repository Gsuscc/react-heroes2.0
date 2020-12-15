import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SnowStorm from 'react-snowstorm';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      {/* <SnowStorm followMouse={false} animationInterval={10} flakesMaxActive={120}/>  */}
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
