import React from "react";
import logo from "../assets/logo/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer set-width-1400">
        <div className="footer-firsthalf">
          <div className="field">
            <div className="footer-logo">
              <div>
                <img src={logo} alt="logo" className="footer-logo-img" />
              </div>
              <div className="px-2">
                <div className="footer-logo-name">CODINGPEER</div>
                <div className="footer-sub-logo-name">Find your coding partner</div>
              </div>
            </div>
          </div>
          <div>
            <div className="field">
              <div className="footer-titles">Contact us</div>
              <div>
                <Link to="#" className="footer-mail">codingpeer@gmail.com</Link>
              </div>
            </div>
            <div className="field">
              <div className="footer-titles">Find us on:</div>
              <div className="footer-socials">
                <i className="fab fa-twitter" />
                <i className="fab fa-instagram" />
                <i className="fab fa-linkedin" />
                <i className="fab fa-facebook" />
                <i className="fab fa-youtube" />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>&copy; 2021 Codingpeer. All Rights Reserved.</div>
      </div>
    </footer>
  );
}