import React, { useContext } from "react";
import { GlobalContext } from "../../state/GlobalState";
import InfoText from "./InfoText";

const LoginCheck = (props) => {
  const { userDetails } = useContext(GlobalContext);

  return (
    <React.Fragment>
      {userDetails.isFirstLogin ? (
        <InfoText>Need to set your nickname</InfoText>
      ) : !userDetails.isLoggedIn ? (
        <InfoText>Not authorized</InfoText>
      ) : (
        props.children
      )}
    </React.Fragment>
  );
};
export default LoginCheck;
