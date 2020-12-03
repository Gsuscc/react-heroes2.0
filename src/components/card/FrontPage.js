import React from 'react'
import PropTypes from "prop-types";

const FrontPage = (props) => {
  const hero = props.hero;
  const getColor = props.getColor;

  return (
    <div class="card__face card__face--front">
      <div class="card-border">
        FRONT
      </div>
      
      {/* <div className="card-body">
        <div
          style={getColor ? getColor() : { color: "black" }}
          className="name"
        >
          <div>{hero.name}</div>
        </div>
        <img
          className="heroImg"
          src={hero.image.url}
          alt="img"
          draggable="false"
        ></img>
      </div> */}
    </div>
  )
}

export default FrontPage;

FrontPage.propTypes = {
  hero: PropTypes.object,
  getColor: PropTypes.func
};
