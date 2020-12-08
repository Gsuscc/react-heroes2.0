import React, {useContext, useState, useEffect} from 'react'
import { GlobalContext } from "./GlobalState";
import axios from "axios";
import Loading from '../components/misc/Loading';


const BuildState = () => {
  const { isReady, setIsReady, setIsLoggedIn, setNick } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!isReady) {
      axios.get('http://localhost:8762/api/user/status', {withCredentials: true})
      .then((response) => {
        let data = response.data;
        setIsLoggedIn(true)
        setNick(data.nick)
        setIsLoading(false)
        setIsReady(true)
      }).catch((err) => {
        let statusCode = err.response.status
        if (statusCode === 501) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
        setIsLoading(false)
        setIsReady(true)
      });
    }

  }, [isReady, setIsReady, setNick, setIsLoggedIn])


  return (
    <React.Fragment>
      {isLoading ? <Loading /> : null}
    </React.Fragment>
  )
}

export default BuildState;