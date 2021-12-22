import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";

export default function Forgotpassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      setMessage("");
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div
        className="modal fade"
        id="forgotpassword"
        aria-hidden="true"
        aria-labelledby="forgotpasswordLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3
                className="modal-title w-100 text-center"
                id="forgotpasswordLabel"
              >
                Reset Password
              </h3>
              <i
                className="fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></i>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  Enter your email address below and we'll send you a link to
                  reset your password.
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label auth-formlabel">
                    Email address
                  </label>
                  <div className="input-box">
                    <i className="fas fa-user" />
                    <div className="vr" />
                    <input
                      type="email"
                      className="form-control auth-input"
                      id="email"
                      ref={emailRef}
                      placeholder="Email address"
                      required
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-lg w-100"
                >
                  Reset Password
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <div className="w-100 text-center">
                <Link
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  to="#login"
                >
                  Log In
                </Link>
                {" or "}
                <Link
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  to="#signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}