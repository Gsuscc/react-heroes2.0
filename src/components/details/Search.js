import React, { useState, useEffect, useCallback, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../state/GlobalState";
import axios from "axios";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function Autocompleter(props) {
  const { heroDetails, setHeroDetails, addNewAlert } = useContext(
    GlobalContext
  );
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState([]);
  const [text, setText] = useState("");
  const [value, setValue] = useState(heroDetails);
  const [loading, setLoading] = useState(false);

  const fillOptions = useCallback((data) => {
    setSearchResult(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    value && setHeroDetails(value);
  }, [value, setHeroDetails]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length >= 2) {
        const queryUrl = `http://localhost:8762/api/hero/search?value=${text}`;
        axios
          .get(queryUrl, { withCredentials: true })
          .then((response) => {
            let result = response.data;
            fillOptions(result);
          })
          .catch((err) => {
            addNewAlert(err.response.data.error);
            console.log(err.response);
          });
        setLoading(true);
      } else {
        setSearchResult([]);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [text, fillOptions, addNewAlert]);

  return (
    <React.Fragment>
      <Autocomplete
        id="searchHero"
        style={{ width: 300 }}
        options={searchResult}
        classes={{
          option: classes.option,
        }}
        autoSelect={true}
        noOptionsText={text.length > 2 ? "Not found..." : "Start typing..."}
        loading={loading}
        value={value}
        onInputChange={(event, value) => setText(value)}
        onChange={(event, value) => setValue(value)}
        inputValue={text}
        getOptionSelected={(option, value) => option.id === value.id}
        autoHighlight
        renderOption={(option) =>
          option.name + " - " + option.biography["full-name"]
        }
        getOptionLabel={(option) => option.name}
        renderInput={(params) => {
          const inputProps = params.inputProps;
          inputProps.autoComplete = "off";
          return (
            <TextField
              {...params}
              inputProps={inputProps}
              label={props.label}
              variant="standard"
            />
          );
        }}
      />
    </React.Fragment>
  );
}
