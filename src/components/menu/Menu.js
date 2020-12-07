import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  paper: {
    background: '#00000088'
  },
  menuItem: {
    fontFamily: 'inherit',
    fontSize: '2em',
    letterSpacing: '3px',
    color: 'orange',
    WebkitTextStrokeWidth: '2px',
    WebkitTextStrokeColor: 'black',
    transition: 'color 0.5s',
    '&:hover': {
      color: 'white',
    } 
  },
  selectedMenuItem: {
    transition: 'background 0.3s',
    '&:hover': {
      background: 'red',
    } 
  },
  menuButton: {
    fontFamily: 'inherit',
    fontSize: '3em',
    letterSpacing: '3px',
    color: 'orange',
    WebkitTextStrokeWidth: '2px',
    WebkitTextStrokeColor: 'black',
    position: 'absolute',
    left: '20px',
    transition: 'color 0.3s',
    '&:hover': {
      color: 'white',
      background: 'initial'
    } 
  }
});

const Menu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleMenuSelect = (event, text) => {
    if (text === 'Login') {
      history.push('/login')
    }
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Login', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text} classes={{button: classes.selectedMenuItem}} onClick={(event) => handleMenuSelect(event, text)}>
            <ListItemText primary={text} classes={{primary: classes.menuItem}} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          {!open && <Button onClick={toggleDrawer(true)} classes={{root: classes.menuButton}}>MENU</Button>}
          <Drawer 
            open={open} 
            onClose={toggleDrawer(false)}
            classes={{paper: classes.paper}}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default Menu;