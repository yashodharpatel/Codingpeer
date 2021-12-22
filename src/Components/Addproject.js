import React, { useState } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { database } from "../firebase";

export default function AddProject() {
  const { currentUser } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projects = {
      projectName,
      projectURL,
      projectDesc,
    };

    try {
      setError("");
      await database
        .ref("users")
        .child(currentUser.uid)
        .child("projects")
        .child(projectName)
        .set(projects);
      alert("Project added successfully");
    } catch {
      setError("Failed to add project!");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#addproject"
      >
        <i className="fas fa-plus" />
        &nbsp; Add Project
      </button>

      <div
        className="modal fade"
        id="addproject"
        tabIndex="-1"
        aria-labelledby="addprojectLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addprojectLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="projectname" className="form-label">
                    Project Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectname"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="projecturl" className="form-label">
                    Project URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="projecturl"
                    placeholder="Project URL"
                    value={projectURL}
                    onChange={(e) => {
                      setProjectURL(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="projectdesc" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="form-control"
                    id="projectdesc"
                    placeholder="Project Description"
                    value={projectDesc}
                    onChange={(e) => {
                      setProjectDesc(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
