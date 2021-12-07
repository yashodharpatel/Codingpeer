import React from "react";

export default function EditprofileNav(props) {
  return (
    <>
      <nav>
        <ul className="editprofile-nav-links">
          <div className="mb-3">
            <div className="editprofile-nav-title">EDIT PROFILE</div>
            <li onClick={() => props.setComponentToRender("PersonalDetails")}>
              Personal details
            </li>
            <li onClick={() => props.setComponentToRender("Preferences")}>
              Preferences
            </li>
          </div>
          <div className="mb-3">
            <div className="editprofile-nav-title">ACCOUNT MANAGEMENT</div>
            <li onClick={() => props.setComponentToRender("Account")}>
              Account
            </li>
            <li onClick={() => props.setComponentToRender("Password")}>
              Password
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}