import React from 'react';
import coinimg from '../../img/coin.png';

export default function Coin(props) {
  return (
    <div style={{padding: '10px'}}>
      <img src={coinimg} alt="coin" width={props.size} height={props.size}  />
    </div>
    
  )
}
