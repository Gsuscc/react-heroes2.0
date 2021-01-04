import { useEffect, useContext } from "react";
import { GlobalContext } from "../../state/GlobalState";

const LoginCheck = () => {
  const { refreshUserDetails } = useContext(GlobalContext);

  useEffect(() => {
    refreshUserDetails();
  }, [refreshUserDetails]);
};
export default LoginCheck;
