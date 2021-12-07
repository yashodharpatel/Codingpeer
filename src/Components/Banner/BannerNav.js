import React from "react";
import Login from "../Authentication/Login";
import Forgotpassword from "../Authentication/Forgotpassword";

export default function BannerNav() {
  return (
    <nav className="nav" id="nav">
      <div className="logo">Company Name</div>
      <ul className="nav-links">
        <li>Support</li>
        <li>Learn</li>
        <li>Contact</li>
        <Login />
      </ul>
      <Forgotpassword />
    </nav>
  );
}