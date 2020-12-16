import React from "react";
import { GlobalContext } from "../../state/GlobalState";
import Alert from "./Alert";
import "./Alerts.css";

const Alerts = () => {
  const { alerts } = React.useContext(GlobalContext);
  return (
    <React.Fragment>
      {alerts.map((alert) => {
        return <Alert>{alert}</Alert>;
      })}
    </React.Fragment>
  );
};

export default Alerts;
