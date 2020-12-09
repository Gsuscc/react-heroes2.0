import React from 'react';
import legendBadge from '../../img/legendary.png';

export default function LegendBadge(props) {
  return (
    <div style={{padding: `${props.size/5}px`}}>
      <img src={legendBadge} alt="legend" width={props.size} height={props.size}  />
    </div>
    
  )
}