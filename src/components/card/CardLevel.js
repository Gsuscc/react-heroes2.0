import React from 'react'

export default function CardLevel(props) {
  return (
    <div className="card-level">
      <div className="card-level-name">LVL</div>
      <div>{props.level}</div>      
    </div>
  )
}
