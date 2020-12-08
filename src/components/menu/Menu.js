import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuButton from '../misc/MenuButton';
import axios from 'axios';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  paper: {
    background: '#00000088'
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
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleLogout = () =>{
    axios.get('http://localhost:8762/api/auth/logout', {withCredentials: true})
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <MenuButton onClick={() => history.push('/login')}>Login</MenuButton>
      <MenuButton onClick={() => history.push('/home')}>Home</MenuButton>
      <MenuButton onClick={() => history.push('/heroes')}>Heroes</MenuButton>
      <MenuButton onClick={handleLogout}>Logout</MenuButton>
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