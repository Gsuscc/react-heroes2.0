import React from 'react'
import CardHeader from "./CardHeader"
import SampleImg from '../misc/SampleImg'

const SampleCard = (props) => {

  return (
      <div className='card-scene'>
    <div className="card__face card__face--front">
      <div className={`card-border card-rarity-${'common'}`}>
        <div className="card-body">
          <CardHeader getColor={() => {}} heroName={'Sample Sam'} />
          <div className="card-image-container">
            <SampleImg/>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SampleCard;
