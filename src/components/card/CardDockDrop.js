import React from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "33px",
  backgroundColor: "#ffffffcf",
  borderRadius: "20px",
  boxShadow: "4px 2px 40px 20px #4b4f50",
};

const statsStyle = {
  width: "200px",
  height: "180px",
  fontSize: "30px",
  color: "orange",
  textAlign: "center",
  WebkitTextStrokeWidth: "1px",
  WebkitTextStrokeColor: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "0px 20px",
};

const CardDockDrop = (props) => {
  const [{ isOver, dragItem }, drop] = useDrop({
    accept: "hero",
    drop(item) {
      props.onDrop(item.hero);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
    }),
  });
  const opacity = isOver ? 1 : 0.7;
  let color = isOver ? "green" : "orange";
  let xp = dragItem ? props.hero.xp + 100 + dragItem.hero.xp : props.hero.xp;
  let level = getLevel(xp);

  return (
    <div ref={drop} style={{ ...containerStyle }}>
      <div style={{ opacity, margin: "0px 20px" }}>{props.children}</div>
      <div style={statsStyle}>
        <div>
          <div>XP</div>
          <div style={{ color }}>{xp + " / " + getNextLimit(xp)}</div>
        </div>
        <div>
          <div>LVL</div>
          <div style={{ color }}>{level}</div>
        </div>
      </div>
    </div>
  );
};

export default CardDockDrop;

CardDockDrop.propTypes = {
  onDrop: PropTypes.func,
};

const xpLevels = [
  0,
  100,
  400,
  1500,
  5000,
  15000,
  30000,
  55000,
  80000,
  100000,
  130000,
  160000,
  200000,
];

const getLevel = (xp) => {
  for (const [index, levelLimit] of xpLevels.entries()) {
    if (xp < levelLimit) return index;
  }
};

const getNextLimit = (xp) => {
  for (const [index, levelLimit] of xpLevels.entries()) {
    if (xp < levelLimit) return xpLevels[index];
  }
};
