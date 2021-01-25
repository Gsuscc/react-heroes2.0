import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SnowStorm from "react-snowstorm";
import App from "./App";
import { GlobalState } from "./state/GlobalState";
import { MyCardState } from "./state/MyCardState";

ReactDOM.render(
  <React.StrictMode>
    {/* <SnowStorm followMouse={false} animationInterval={10} flakesMaxActive={120}/>  */}
    <GlobalState>
        <App />
    </GlobalState>
  </React.StrictMode>,
  document.getElementById("root")
);
