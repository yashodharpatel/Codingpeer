import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return setError("Password must contain atleast 6 characters");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/create-account");
      document.querySelector(".modal-backdrop").remove();
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        className="btn signup-btn"
        data-bs-toggle="modal"
        data-bs-target="#signup"
      >
        Create Account
      </button>
      {/* <Link
        className="btn"
        data-bs-toggle="modal"
        to="#signup"
        role="button"
      >
        Create Account
      </Link> */}

      <div
        className="modal fade"
        id="signup"
        aria-hidden="true"
        aria-labelledby="signupLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title w-100 text-center" id="signupLabel">
                Create Account
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
              <form onSubmit={handleSubmit}>
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label auth-formlabel">
                    Create Password
                  </label>
                  <div className="input-box">
                    <i className="fas fa-lock" />
                    <div className="vr" />
                    <input
                      type="password"
                      className="form-control auth-input"
                      id="password"
                      ref={passwordRef}
                      placeholder="Create Password"
                      aria-describedby="passwordHelp"
                      required
                    />
                  </div>
                  <div id="passwordHelp" className="form-text">
                    Password must contain atleast 6 characters
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordConfirm" className="form-label auth-formlabel">
                    Confirm Password
                  </label>
                  <div className="input-box">
                    <i className="fas fa-lock" />
                    <div className="vr" />
                    <input
                      type="password"
                      className="form-control auth-input"
                      id="passwordConfirm"
                      ref={passwordConfirmRef}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-lg w-100"
                >
                  Create Account
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <div className="w-100 text-center">
                Already have an account?{" "}
                <Link
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  to="#login"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}