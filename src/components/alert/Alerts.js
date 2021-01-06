import React from "react";
import { GlobalContext } from "../../state/GlobalState";
import "./Alerts.css";

const Alerts = (props) => {
  const { alerts } = React.useContext(GlobalContext);

  return <React.Fragment>{alerts.map((alert) => alert)}</React.Fragment>;
};

export default Alerts;
