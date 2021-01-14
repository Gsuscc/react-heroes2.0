import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const BorderLinearProgress = withStyles((theme) => ({
  colorPrimary: {
    backgroundColor: "lightgray",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "green",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    width: "333px",
    height: "40px",
    padding: "5px",
  },
  bar: {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
  },
  label: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'superHeroFont',
    fontWeight: 'bold',
    width: '333px',
    textAlign: 'center',
    fontSize: '20px',
  },
});

function LinearProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root} display="flex" alignItems="center">
      <BorderLinearProgress
        className={classes.bar}
        variant="determinate"
        {...props}
      />
      <Typography
        className={classes.label}
        variant="body2"
        color="textSecondary"
      >{props.labelToShow}</Typography>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;
