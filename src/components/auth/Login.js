import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../state/GlobalState";
import TextField from "@material-ui/core/TextField";
import HeroButton from "../misc/HeroButton";
import FormContainer from "./FormContainer";

const Login = () => {
  const history = useHistory();
  const { refreshUserDetails, addNewAlert } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    axios
      .post(
        "http://localhost:8762/api/auth/login",
        {
          email: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        refreshUserDetails();
        history.push("/");
      })
      .catch((err) => {
        addNewAlert(err.response.data.error);
        console.log(err);
      });
  };

  const handleRegisterClick = (e) => {
    history.push("/register");
  };

  return (
    <FormContainer>
      <TextField
        margin="dense"
        id="email"
        label="E-mail"
        type="email"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        autoComplete="off"
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleClick(e);
          }
        }}
      />
      <HeroButton onClick={handleClick}>Login</HeroButton>
      <div>
        Or you can
        <HeroButton onClick={handleRegisterClick}>Register</HeroButton>
        new account
      </div>
    </FormContainer>
  );
};

export default Login;
