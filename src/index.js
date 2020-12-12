import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Snowfall from 'react-snowfall'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <Snowfall style={{ zIndex: '1000' }}/>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
