import React from "react";
import SampleCard from "../card/SampleCard";
import PageTitle from "../header/PageTitle";
import "./About.css";

const About = (props) => {
  return (
    <React.Fragment>
      <PageTitle>About the application</PageTitle>
      <SampleCard />
    </React.Fragment>
  );
};
export default About;
