import React from 'react';
import sample from '../../img/sample.png';

export default function SampleImg(props) {
  return (
    <div>
      <img className="card-image" src={sample} alt="sample"/>
    </div>
    
  )
}