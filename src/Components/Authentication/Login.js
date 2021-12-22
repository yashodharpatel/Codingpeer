import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/Authcontext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard/");
      document.querySelector(".modal-backdrop").remove();
    } catch {
      setError("Failed to Sign In");
    }

    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        className="btn login-btn"
        data-bs-toggle="modal"
        data-bs-target="#login"
      >
        Log In
      </button>

      <div
        className="modal fade"
        id="login"
        aria-hidden="true"
        aria-labelledby="loginLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title w-100 text-center" id="loginLabel">
                Log In
              </h3>
              <i
                className="fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} id="loginform">
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
                  <label
                    htmlFor="password"
                    className="form-label auth-formlabel"
                  >
                    Password
                  </label>
                  <div className="input-box">
                    <i className="fas fa-lock" />
                    <div className="vr" />
                    <input
                      type="password"
                      className="form-control auth-input"
                      id="password"
                      ref={passwordRef}
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-lg w-100 mt-3"
                  id="loginbutton"
                >
                  Log In
                </button>
              </form>
              <div className="w-100 text-center mt-2">
                <Link
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  to="#forgotpassword"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="modal-footer">
              <div className="w-100 text-center">
                New to Codingpeer?{" "}
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