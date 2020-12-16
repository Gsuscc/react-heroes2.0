import React, { useContext } from "react";
import { GlobalContext } from "../../state/GlobalState";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuButton from "../misc/MenuButton";
import axios from "axios";
import { SoundContext } from "../../state/SoundState";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  paper: {
    background: "#00000088",
  },
  menuButton: {
    fontFamily: "inherit",
    fontSize: "3em",
    letterSpacing: "3px",
    color: "orange",
    WebkitTextStrokeWidth: "2px",
    WebkitTextStrokeColor: "black",
    position: "fixed",
    left: "20px",
    transition: "color 0.3s",
    "&:hover": {
      color: "white",
      background: "initial",
    },
  },
});

const Menu = () => {
  const { refreshStatus, isLoggedIn, nick, addNewAlert } = useContext(
    GlobalContext
  );
  const { playWoosh } = useContext(SoundContext);
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
    playWoosh();
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8762/api/auth/clear", { withCredentials: true })
      .then((response) => {
        refreshStatus().then(history.push("/"));
      })
      .catch((err) => {
        addNewAlert(err.response.data.error);
        console.log(err);
      });
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {isLoggedIn && nick === null && (
        <MenuButton onClick={() => history.push("/nick")}>Set Nick</MenuButton>
      )}
      {isLoggedIn && <MenuButton onClick={handleLogout}>Logout</MenuButton>}
      {!isLoggedIn && (
        <MenuButton onClick={() => history.push("/login")}>Login</MenuButton>
      )}
      {!isLoggedIn && (
        <MenuButton onClick={() => history.push("/register")}>
          Register
        </MenuButton>
      )}
      {isLoggedIn && nick !== null && (
        <MenuButton onClick={() => history.push("/home")}>Home</MenuButton>
      )}
      {isLoggedIn && nick !== null && (
        <MenuButton onClick={() => history.push("/mycards")}>
          My Cards
        </MenuButton>
      )}
      {isLoggedIn && nick !== null && (
        <MenuButton onClick={() => history.push("/cardshop")}>
          Card Shop
        </MenuButton>
      )}
      <MenuButton onClick={() => history.push("/")}>Heroes</MenuButton>
      <MenuButton onClick={() => history.push("/about")}>About</MenuButton>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        {!open && (
          <Button
            onClick={toggleDrawer(true)}
            classes={{ root: classes.menuButton }}
          >
            MENU
          </Button>
        )}
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          classes={{ paper: classes.paper }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Menu;
