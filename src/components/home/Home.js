import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../misc/Loading';

const Home = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState({nick:null, email:null, balance:null});

  useEffect(() => {
    axios.get('http://localhost:8762/api/user/mydetails', {withCredentials: true})
      .then((response) => {
        console.log(response)
        let data = response.data;
        setDetails(data)
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)
      });
  }, [])


  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading &&
        <div>        
          <div>
            {details.nick}
          </div>
          <div>
            {details.email}
          </div>
          <div>
            {details.balance}
          </div>
        </div>

      }    
    </React.Fragment>

  )
}

export default Home;