import React from 'react';
import santaHat from '../../img/santaHat.png';
import './Santa.css'

export default function Santa(props) {
  return (
    <div className="santa-hat">
      <img src={santaHat} alt="coin" className='santa-hat-img' />
    </div>
    
  )
}
