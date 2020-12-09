import React from 'react'
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    zIndex:5,
    fontFamily: 'inherit',
    fontSize: `2em`,
    padding: '0px 20px',
    borderRadius: '5px',
    letterSpacing: '3px',
    color: 'orange',
    WebkitTextStrokeWidth: '2px',
    WebkitTextStrokeColor: 'black',
    transition: 'color 0.5s',
    '&:hover': {
      color: 'white',
      background: 'initial'
    },
  },
});

const CardButton = (props) => {

  const classes = useStyles();

  return (
    <Button className="dotted" onClick={props.onClick} classes={{root: classes.root}}>
      {props.children}
    </Button>
  )
}

export default CardButton;

CardButton.propTypes = {
  onClick: PropTypes.func,
};

CardButton.defaultProps = {
  onClick: () => {},
};