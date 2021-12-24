import React, { useState } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { Link, useHistory } from "react-router-dom";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const uid = currentUser.uid;
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="nav header-nav" id="nav">
        <div className="set-width-1200">
          <div className="inside-nav header-insidenav">
            <div className="logo">
              <Link
                to="/dashboard/"
                className="remove-td"
                style={{ color: "#048dbb" }}
              >
                coding<span style={{ color: "rgb(93, 93, 93)" }}>peer</span>
              </Link>
            </div>
            <ul className="nav-links header-navlinks">
              <li>
                <Link to="/dashboard/" className="remove-td">
                  <i className="fas fa-home nav-icon" />
                  <div className="nav-text">Home</div>
                </Link>
              </li>
              <li>
                <Link to="/messages/" className="remove-td">
                  <i className="fas fa-comment-dots nav-icon" />
                  <div className="nav-text">Messaging</div>
                </Link>
              </li>
              <li>
                <Link to="/notifications/" className="remove-td">
                  <i className="fas fa-bell nav-icon" />
                  <div className="nav-text">Notifications</div>
                </Link>
              </li>
              <li>
                <div
                  id="profile"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="profile-dropdown"
                >
                  <img
                    src="https://i1.wp.com/devpost-challengepost.netdna-ssl.com/assets/defaults/no-avatar-180.png?ssl=1"
                    alt="profile-pic"
                    className="nav-profile-pic"
                  />
                  <div className="nav-text">
                    Me <i className="fas fa-caret-down" />
                  </div>
                </div>
                <ul className="dropdown-menu" aria-labelledby="profile">
                  <li>
                    <Link
                      className="dropdown-item"
                      style={{ color: "#212529" }}
                      to={"/profile/" + uid + "/"}
                    >
                      Your profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}