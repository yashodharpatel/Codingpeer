import React, { useState } from "react";
import Header from "../Components/Header";
import EditprofileNav from "../Components/Editprofile/EditprofileNav";
import Profiledetails from "../Components/Editprofile/Profiledetails";
import Preferences from "../Components/Editprofile/Preferences";
import Account from "../Components/Editprofile/Account";
import Password from "../Components/Editprofile/Password";

export default function Editprofile() {
  const [componentToRender, setComponentToRender] = useState("PersonalDetails");

  return (
    <div>
      <Header />
      <div className="editprofile-title">
        <div>Edit your profile</div>
      </div>
      <div className="change-card-display edit-profile">
        <div className="editprofile-firsthalf">
          <EditprofileNav setComponentToRender={setComponentToRender} />
        </div>
        <div className="editprofile-secondhalf">
          {componentToRender === "PersonalDetails" ? <Profiledetails /> : ""}
          {componentToRender === "Preferences" ? <Preferences /> : ""}
          {componentToRender === "Account" ? <Account /> : ""}
          {componentToRender === "Password" ? <Password /> : ""}
        </div>
      </div>
    </div>
  );
}