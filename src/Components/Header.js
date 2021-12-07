import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import facebook from "../assets/socials/facebook.png";
import namelogo from "../assets/logo-removebg.png";
import { useAuth } from "../Contexts/Authcontext";

export default function Header(props) {
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
      <nav className="main-nav" id="main-nav">
        <div className="inside-nav">
          <div className="d-flex align-items-center">
            <div className="nav-logo">
              <div>
                <img
                  src="https://i1.wp.com/devpost-challengepost.netdna-ssl.com/assets/defaults/no-avatar-180.png?ssl=1"
                  src={namelogo}
                  alt="logo"
                  className="logo-img"
                />
              </div>
              <div className="logo-name">Codingpeer</div>
            </div>
            <div>
              {props.displaySearch ? (
                <div className="form-control search-bar d-flex align-items-center">
                  <i className="fa fa-search" />
                  <input
                    type="text"
                    className="form-control"
                    style={{ border: "none" }}
                    placeholder="Search users by names, specialty, skills or intrests."
                    onChange={(event) => {
                      props.setSearch(event.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <ul className="nav-links">
            <li>
              <i className="fas fa-home nav-icon" />
              <div className="nav-text">Home</div>
            </li>
            <li>
              <i className="fas fa-comment-dots nav-icon" />
              <div className="nav-text">Messaging</div>
            </li>
            <li>
              <i className="fas fa-bell nav-icon" />
              <div className="nav-text">Notifications</div>
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
                  Me <i class="fas fa-caret-down" />
                </div>
              </div>
              <ul className="dropdown-menu" aria-labelledby="profile">
                <li>
                  <Link
                    className="dropdown-item"
                    to={"/profile/"+ uid + "/"}
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

          {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
        </div>
      </nav>
    </>
  );
}
