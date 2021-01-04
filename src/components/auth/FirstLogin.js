import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import HeroButton from "../misc/HeroButton";
import FormContainer from "./FormContainer";
import { GlobalContext } from "../../state/GlobalState";

const FirstLogin = () => {
  const { refreshUserDetails, addNewAlert } = useContext(GlobalContext);
  const history = useHistory();
  const [nickField, setNickField] = useState("");

  const handleClick = (e) => {
    axios
      .post(
        "http://localhost:8762/api/user/create",
        {
          nick: nickField,
        },
        { withCredentials: true }
      )
      .then((response) => {
        refreshUserDetails();
        history.push("/");
      })
      .catch((err) => {
        addNewAlert(err.response.data.error);
        console.log(err.response);
      });
  };

  return (
    <FormContainer>
      <TextField
        margin="dense"
        id="nick"
        label="Nickname"
        type="text"
        onChange={(event) => setNickField(event.target.value)}
        value={nickField}
        autoComplete="off"
      />
      <HeroButton onClick={handleClick}>Send</HeroButton>
    </FormContainer>
  );
};

export default FirstLogin;
