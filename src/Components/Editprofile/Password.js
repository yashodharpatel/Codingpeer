import React, { useState } from "react";
import { useAuth } from "../../Contexts/Authcontext";
import { firebaseapp } from "../../firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Password() {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confiredPassword, setConfiredPassword] = useState("");
  const { currentUser, updatePassword } = useAuth();
  const [error, setError] = useState("");

  var credential = firebaseapp.default.auth.EmailAuthProvider.credential(
    currentUser.email,
    oldPassword
  );

  // Prompt the user to re-provide their sign-in credentials

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confiredPassword) {
      return setError("Passwords do not match");
    }

    currentUser
      .reauthenticateWithCredential(credential)
      .then(function () {
        const promises = [];
        // setLoading(true);
        setError("");

        if (newPassword) {
          promises.push(updatePassword(newPassword));
        }

        Promise.all(promises)
          .then(() => {
            history.push("/");
          })
          .catch(() => {
            setError("Failed to update account");
          });
      })
      .catch(function (error) {
        setError("Old password wrong");
      });
  };
  return (
    <div>
      <div className="editprofile-component-header">
        <div className="editprofile-component-title">Account</div>
        {/* <div className="editprofile-component-sub-title">
          The Information will appperar on your public Codingpeer profile.
        </div> */}
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            className="form-control"
            id="email"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="email"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Retype Password
          </label>
          <input
            type="password"
            className="form-control"
            id="email"
            value={confiredPassword}
            onChange={(e) => {
              setConfiredPassword(e.target.value);
            }}
          />
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
      </form>
    </div>
  );
}
