import React from 'react'

const BackPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;

  return (
    <div class="card__face card__face--back">
      <div class="card-border">
        BACK
      </div>
    </div>
  )
}

export default BackPage;