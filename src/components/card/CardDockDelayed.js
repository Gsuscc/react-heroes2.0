import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";

function CardDockDelayed(props) {

  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const reveal = setTimeout(() => setIsRevealed(true), props.delay)
    return () => {
      clearTimeout(reveal)
    }
  }, [props.delay])

  const getStyle = () => {
    return {
      margin: props.margin
    }
  }

  return (
    <div className={`card-dock ${isRevealed ? "card-revealed" : "card-hidden"}`} style={getStyle()}>
      {props.children}
    </div>
  )
}

export default CardDockDelayed;

CardDockDelayed.propTypes = {
  margin: PropTypes.string,
  delay: PropTypes.number
};

CardDockDelayed.defaultProps = {
  margin: "10px",
  delay: 0
};