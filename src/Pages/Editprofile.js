import React, { useState } from "react";
import Header from "../Components/Header";
import EditprofileNav from "../Components/Editprofile/EditprofileNav";
import Profiledetails from "../Components/Editprofile/Profiledetails";
import Preferences from "../Components/Editprofile/Preferences";
import Account from "../Components/Editprofile/Account";
import Password from "../Components/Editprofile/Password";
import Footer from "../Components/Footer";

export default function Editprofile() {
  const [componentToRender, setComponentToRender] = useState("ProfileDetails");

  return (
    <div>
      <Header />
      <div className="editprofile-title">
        <div className="set-width-1200">Edit your profile</div>
      </div>
      <div className="set-width-1200 editprofile-display">
        <div className="editprofile-firsthalf">
          <EditprofileNav setComponentToRender={setComponentToRender} />
        </div>
        <div className="editprofile-secondhalf">
          {componentToRender === "ProfileDetails" ? <Profiledetails /> : ""}
          {componentToRender === "Preferences" ? <Preferences /> : ""}
          {componentToRender === "Account" ? <Account /> : ""}
          {componentToRender === "Password" ? <Password /> : ""}
        </div>
      </div>
      <div className="footer-display">
        <Footer />
      </div>
    </div>
  );
}