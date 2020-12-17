import React from "react";

const paddingContent = {
  padding: "0% 10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function PaddingContent(props) {
  return <div style={paddingContent}>{props.children}</div>;
}
