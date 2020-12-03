import React from 'react'
import PropTypes from "prop-types";

const FrontPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;

  return (
    <div class="card__face card__face--front">
      front
    </div>
  )
}

export default FrontPage;

FrontPage.propTypes = {
  hero: PropTypes.object,
  getColor: PropTypes.func
};
