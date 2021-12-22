import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login";
import Forgotpassword from "../Authentication/Forgotpassword";

export default function BannerNav() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="nav banner-nav" id="nav">
      <div className="set-width-1400">
        <div className="inside-nav">
          <div className="d-flex align-items-center justify-content-center">
            <div className="menu-icon" onClick={handleClick}>
              <i className={clicked ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <div className="logo">
              <Link to="/" className="remove-td" style={{ color: "#048dbb" }}>
                coding<span style={{ color: "black" }}>peer</span>
              </Link>
            </div>
          </div>
          <ul
            className={
              clicked
                ? "nav-links banner-navlinks"
                : "nav-links banner-navlinks close"
            }
          >
            <li>Support</li>
            <li>Learn</li>
            <li>Contact</li>
          </ul>
          <Login />
        </div>
        <Forgotpassword />
      </div>
    </div>
  );
}
