import React from "react";
import Signup from "../Authentication/Signup";
import Background from "../../assets/bg.jpg";

export default function Banner() {
  return (
    <div className="banner" id="banner">
      <div className="intro-section">
        <div className="intro-text">Some text here.</div>
        <Signup />
      </div>
      <div className="background">
        <img src={Background} alt="background" width="800px"/>
      </div>
    </div>
  );
}