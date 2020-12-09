import React, { useState, useEffect, useCallback, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';


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
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState([]);
  const [text, setText] = useState("");
  const [value,setValue] = useState('')
//   const componentID = props.inputId;
  const label = props.label;
  const [loading, setLoading] = useState(false);

  const fillOptions = useCallback((data) => {
    setSearchResult(data.values);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length >= 2) {
        const queryUrl = `http://localhost:8762/api/hero/search?value=${text}`;
        axios.get(queryUrl, {withCredentials:true})
        .then(response => {
            let result = response.data;
            console.log(response)
            // fillOptions(result);
        })
        .catch((err) => console.log(err.response));
        setLoading(true);
      } else {
        setSearchResult([]);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [text, fillOptions]);

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
        getOptionSelected={(option, value) => option.code === value.code}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderInput={(params) => {
          const inputProps = params.inputProps;
          inputProps.autoComplete = "off";
          return (
            <TextField
              {...params}
              inputProps={inputProps}
              label={label}
              variant="standard"
            />
          );
        }}
      />
    </React.Fragment>
  );
}
