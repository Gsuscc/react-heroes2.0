import React from 'react';
import sample from '../../img/sample.png';

export default function Coin(props) {
  return (
    <div style={{padding: `${props.size/5}px`}}>
      <img className="card-image" src={sample} alt="coin" width={props.size} height={props.size}  />
    </div>
    
  )
}