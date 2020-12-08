import React, {useContext, useState, useEffect} from 'react'
import { GlobalContext } from "./GlobalState";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Loading from '../components/misc/Loading';


const BuildState = () => {
  const { loginStatus, nickName } = useContext(GlobalContext);
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = loginStatus;
  const [nick, setNick] = nickName;
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    axios.get('http://localhost:8762/api/user/status', {withCredentials: true})
      .then((response) => {
        let data = response.data;
        setIsLoggedIn(true)
        setNick(data.nick)
        setIsLoading(false)
        console.log(data)
        history.push('/heroes')
      }).catch((err) => {
        let statusCode = err.response.status
        if (statusCode === 501) {
          setIsLoggedIn(true)
          history.push('/nick')
        }
        if (statusCode === 403) {
          history.push('/heroes')
        }
        setIsLoading(false)
      });
    return () => {
      
    }
  }, [])


  return (
    <React.Fragment>
      {isLoading ? <Loading /> : null}
    </React.Fragment>
  )
}

export default BuildState;