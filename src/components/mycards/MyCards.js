import React, { useState } from 'react';
import axios from "axios";

export default function MyCards() {

  axios.get(`http://localhost:8762/api/user/mycards`, {withCredentials: true})
  .then((response) => {
    console.log(response.data)
    // setHeroesList(response.data);
    // setIsLoading(false)
  }).catch((err) => {
    console.log(err)
    // setIsLoading(false)
  });

  return (
    <div>
      
    </div>
  )
}
