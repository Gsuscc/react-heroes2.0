import React from 'react'
import CardStat from './CardStat'

export default function CardStats(props) {
  const powerStats = props.powerStats; 

  return (
    <React.Fragment>
      <div className="card-stats-container">
        {Object.entries(powerStats).map(([key, value]) => {
          return <CardStat name={key} value={value} key={key + value} />;
        })}
      </div>
    </React.Fragment>
  )
}
