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
      .catch(function () {
        setError("Old password wrong");
      });
  };

  return (
    <div>
      <div className="editprofile-component-header">
        <div className="editprofile-component-title">Change your password</div>
        <div className="editprofile-component-sub-title">
          Password must be 6+ characters.
        </div>
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
            placeholder="Old Password"
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
            placeholder="New Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="email"
            value={confiredPassword}
            onChange={(e) => {
              setConfiredPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn">
          Save Changes
        </button>
        <Link
          to={"/user/" + currentUser.uid}
          type="button"
          className="btn btn-secondary mx-1"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}