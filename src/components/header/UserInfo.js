import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { GlobalContext } from "../../state/GlobalState";
import HeroButton from '../misc/HeroButton';
import Coin from '../misc/Coin';
import './UserInfo.css';

export default function UserInfo() {
  const history = useHistory();
  const { nick, balance } = useContext(GlobalContext);
  return (
    <React.Fragment>
      {nick !== null &&
        <div className="userinfo-container">
          <div>Logged in as</div>
          <HeroButton onClick={() => history.push("/home")}>
            {nick}
          </HeroButton>
          <div>Balance</div>
          <div className="userinfo-balance">{balance}<Coin size={20}/></div>
        </div>
      }
    </React.Fragment>

  )
}
