import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../Contexts/Authcontext";
export default function Profiledetails() {


  const { currentUser } = useAuth();
  return (
    <>
      <div className="editprofile-component-header">
        <div className="editprofile-component-title">Personal Details</div>
        <div className="editprofile-component-sub-title">
          The Information will appperar on your public Codingpeer profile.
        </div>
      </div>
      <div className="change-display">
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            placeholder="First Name"
            // value={firstName}
            // onChange={(e) => {
            //   setFirstName(e.target.value);
            // }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Last Name"
            // value={lastName}
            // onChange={(e) => {
            //   setLastName(e.target.value);
            // }}
          />
        </div>
      </div>

      <div className="change-display">
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City/Town
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="City/Town"
            // value={city}
            // onChange={(e) => {
            //   setCity(e.target.value);
            // }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth <span className="required">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            // value={DOB}
            // onChange={(e) => {
            //   setDOB(e.target.value);
            // }}
            required
          />
        </div>
      </div>

      {/* <div className="field"> */}
          <div className="field-title">Education</div>
          <div className="college">
            <div className="change-display">
              <div className="mb-3">
                <label htmlFor="collegename" className="form-label">
                  Name of College
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="collegename"
                  placeholder="Name of College"
                  // value={collegeName}
                  // onChange={(e) => {
                  //   setCollegeName(e.target.value);
                  // }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="yearofcollege" className="form-label">
                  Year of College <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  id="yearofcollege"
                  // value={collegeYear}
                  // onChange={(e) => {
                  //   setCollegeYear(e.target.value);
                  // }}
                  required
                >
                  <option defaultValue>--Year of College--</option>
                  <option value="Not in College">Not in College</option>
                  <option value="First year">First Year</option>
                  <option value="Second year">Second Year</option>
                  <option value="Third year">Third Year</option>
                  <option value="Fourth year">Fourth Year</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
            </div>
          {/* </div> */}

          <div className="mb-3">
            <label htmlFor="workexperience" className="form-label">
              Work Experience
            </label>
            <input
              type="text"
              className="form-control"
              id="workexperience"
              placeholder="Work Experience"
              aria-describedby="Exampleworkexperience"
              // value={workExperience}
              // onChange={(e) => {
              //   setWorkExperience(e.target.value);
              // }}
            />
            <div id="Exampleworkexperience" className="form-text">
              (e.g. 6 Months/2 Years)
            </div>
          </div>
        </div>

      <div className="field">
        <div className="field-title">Socials</div>
        <div className="social-title">Coding</div>
        <div className="change-display">
          <div className="mb-3 d-flex">
            <label htmlFor="github" className="col-form-label">
            <i class="fab fa-github" />

            </label>
            <input
              type="url"
              className="form-control"
              id="github"
              placeholder="GitHub"
              // value={GitHub}
              // onChange={(e) => {
              //   setGitHub(e.target.value);
              // }}
            />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="stackoverflow" className="col-form-label">
            <i class="fab fa-stack-overflow" />

            </label>
            <input
              type="url"
              className="form-control"
              id="stackoverflow"
              placeholder="Stack Overflow"
              // value={stackOverflow}
              // onChange={(e) => {
              //   setStackOverflow(e.target.value);
              // }}
            />
          </div>
        </div>

        <div className="social-title">Genral/Social Media</div>
        <div className="change-display">
          <div className="mb-3 d-flex">
            <label htmlFor="website" className="col-form-label">
            <i class="fas fa-link" />

            </label>
            <input
              type="url"
              className="form-control"
              id="website"
              placeholder="Personal Website"
              // value={website}
              // onChange={(e) => {
              //   setWebsite(e.target.value);
              // }}
            />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="twitter" className="col-form-label">
            <i class="fab fa-twitter" />

            </label>
            <input
              type="url"
              className="form-control"
              id="twitter"
              placeholder="Twitter"
              // value={twitter}
              // onChange={(e) => {
              //   setTwitter(e.target.value);
              // }}
            />
          </div>
        </div>

        <div className="change-display">
          <div className="mb-3 d-flex">
            <label htmlFor="Linkedin" className="col-form-label">
            <i class="fab fa-linkedin" />

            </label>
            <input
              type="url"
              className="form-control"
              id="Linkedin"
              placeholder="LinkedIn"
              // value={linkedIn}
              // onChange={(e) => {
              //   setLinkedIn(e.target.value);
              // }}
            />
          </div>
          <div className="mb-3 d-flex">
            <label htmlFor="facebook" className="col-form-label">
            <i class="fab fa-facebook-square" />


            </label>
            <input
              type="url"
              className="form-control"
              id="facebook"
              placeholder="Facebook"
              // value={facebook}
              // onChange={(e) => {
              //   setFacebook(e.target.value);
              // }}
            />
          </div>
        </div>

        <div className="change-display">
          <div className="mb-3 d-flex">
            <label htmlFor="instagram" className="col-form-label">
            <i class="fab fa-instagram" />

            </label>
            <input
              type="url"
              className="form-control"
              id="instagram"
              placeholder="Instagram"
              // value={instagram}
              // onChange={(e) => {
              //   setInstagram(e.target.value);
              // }}
            />
          </div>
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
    </>
  );
}
