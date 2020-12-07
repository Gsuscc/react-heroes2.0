import React from 'react'
import axios from 'axios'

const Home = () => {

  axios.get('http://localhost:8762/api/user/mydetails', {withCredentials: true})
    .then((response) => {
      let data = response.data;
      console.log(data)
    }).catch((err) => {
      console.log(err)
    });

  return (
    <div>
      HOME
    </div>
  )
}

export default Home;