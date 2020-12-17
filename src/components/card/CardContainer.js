import React from "react";

const cardContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "100px",
};

export default function CardContainer(props) {
  return <div style={cardContainerStyle}>{props.children}</div>;
}
