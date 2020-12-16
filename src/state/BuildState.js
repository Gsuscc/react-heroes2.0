import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./GlobalState";
import Loading from "../components/misc/Loading";

const BuildState = () => {
  const { refreshStatus } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshStatus().then(setIsLoading(false));
  }, [refreshStatus]);

  return <React.Fragment>{isLoading ? <Loading /> : null}</React.Fragment>;
};

export default BuildState;
