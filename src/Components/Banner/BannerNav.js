import React from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login";
import Forgotpassword from "../Authentication/Forgotpassword";

export default function BannerNav() {
  return (
    <div className="nav" id="nav">
      <div className="set-width-1400">
        <div className="inside-nav">
          <div className="logo">
            <Link to="/" className="remove-td">
              coding<span style={{ color: "black" }}>peer</span>
            </Link>
          </div>
          <div class="hamburger">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <ul className="nav-links">
            <li>Support</li>
            <li>Learn</li>
            <li>Contact</li>
            <Login />
          </ul>
          <Forgotpassword />
        </div>
      </div>
    </div>
  );
}
