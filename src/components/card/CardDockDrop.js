import React from 'react'
import { useDrop } from 'react-dnd';
import PropTypes from "prop-types";

const style = {
  borderRadius: '10px',
  padding: '20px 50px',
};

const CardDockDrop = (props) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "hero",
    drop(item) {
        props.onDrop(item.hero);
    },
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  });
  const opacity = isOver ? 1 : 0.7;
  let backgroundColor = canDrop ? '#FFFFFF99' : 'initial';

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <div style={{opacity}}>
        {props.children}
      </div>
		</div>
  )
}

export default CardDockDrop;

CardDockDrop.propTypes = {
  onDrop: PropTypes.func,
};