import React from 'react'
import PropTypes from "prop-types";
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '2em',
    padding: '20px',
    letterSpacing: '3px',
    color: 'orange',
    WebkitTextStrokeWidth: '2px',
    WebkitTextStrokeColor: 'black',
    transition: 'color 0.5s',
    '&:hover': {
      color: 'white',
      background: 'red'
    } 
  },
});

function MenuButton (props) {
  const classes = useStyles();

  return (
    <ListItem button classes={{root: classes.root}} onClick={props.onClick}>
      {props.children}
    </ListItem>
  )
}

MenuButton.propTypes = {
  onClick: PropTypes.func,
};

MenuButton.defaultProps = {
  onClick: () => {},
};

export default MenuButton;