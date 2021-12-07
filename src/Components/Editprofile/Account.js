import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";

export default function Account() {
  const { currentUser } = useAuth();
  return (
    <>
      <div className="editprofile-component-header">
        <div className="editprofile-component-title">Account</div>
        {/* <div className="editprofile-component-sub-title">
          The Information will appperar on your public Codingpeer profile.
        </div> */}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address <span className="required">*</span>
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          // value={email}
          // onChange={(e) => {
          //   setEmail(e.target.value);
          //   setEmailWarning(
          //     "By verifying a new email, " +
          //       currentUserEmail +
          //       " will no longer will associated with your account."
          //   );
          //   if (e.target.value === currentUserEmail) {
          //     setEmailWarning("");
          //   }
          // }}
          // aria-describedby="emailWarning"
          // required
        />
        <div id="emailWarning" className="form-text" style={{ color: "red" }}>
          {/* {emailWarning} */}
        </div>
      </div>
      <div className="mb-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="Cybersecurity"
            value="Cybersecurity"
          />
          <label class="form-check-label" for="Cybersecurity">
            Cybersecurity
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
      <Link
        to={"/user/" + currentUser.uid}
        type="button"
        class="btn btn-secondary mx-2"
      >
        Cancel
      </Link>
      <div className="delete-account">
        <div className="delete-account-title">Delete Account</div>
        <div className="delete-account-sub-title">
          Once you delete your account, there is no going back. Please be
          certain.
        </div>
        <button type="button" class="btn btn-outline-danger">
          Delete account
        </button>
      </div>
    </>
  );
}
