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
  const opacity = canDrop ? 1 : 0.7;
  let backgroundColor = isOver ? '#00FF00AA' : '#FFFFFF55';

  return (
    <div ref={drop} style={{ ...style, backgroundColor, opacity }}>
			{props.children}
		</div>
  )
}

export default CardDockDrop;

CardDockDrop.propTypes = {
  onDrop: PropTypes.func,
};