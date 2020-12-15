import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';

const CardDockDrag = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: props.hero.id,
      type: 'hero',
      hero: props.hero
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const containerStyle = useMemo(() => ({
    opacity: isDragging ? 0.6 : 1,
    margin: '10px'
  }), [isDragging]);

  return (
    <div ref={drag} style={containerStyle}>
      {props.children}
    </div>
  );
}

export default CardDockDrag;