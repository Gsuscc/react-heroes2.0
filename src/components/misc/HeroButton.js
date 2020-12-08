import React from 'react'
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function HeroButton(props) {

  const useStyles = makeStyles({
    root: {
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

  const classes = useStyles();

  return (
    <Button onClick={props.onClick} classes={{root: classes.root}}>
      {props.children}
    </Button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default HeroButton;