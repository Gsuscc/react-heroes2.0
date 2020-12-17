import React, { useEffect, useCallback, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { GlobalContext } from "../../state/GlobalState";
import Loading from "./Loading";

const LoginCheck = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { refreshStatus, addNewAlert } = useContext(GlobalContext);
  const history = useHistory();
  const location = useLocation();

  const checkExeption = React.useMemo(() => {
    return ["/login", "/", "/register", "/nick", "/about", "/details"];
  }, []);

  const checkLoginState = useCallback(() => {
    const check = refreshStatus();
    return check
      .then(() => null)
      .catch((err) => {
        if (!checkExeption.includes(location.pathname)) {
          let statusCode = err.response.status;
          if (statusCode === 501) {
            history.push("/nick");
          } else if (statusCode === 403) {
            history.push("/login");
          } else {
            addNewAlert(err.response.message);
          }
        }
        return {};
      });
  }, [refreshStatus, checkExeption, location.pathname, history, addNewAlert]);

  useEffect(() => {
    checkLoginState().then(() => setIsLoading(false));
  }, [checkLoginState]);

  return (
    <React.Fragment>{isLoading ? <Loading /> : props.children}</React.Fragment>
  );
};
export default LoginCheck;
