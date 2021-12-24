import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/Authcontext";
import { Link } from "react-router-dom";
import { database, storage } from "../../firebase";

export default function Profiledetails() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const [user, setUser] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [DOB, setDOB] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [GitHub, setGitHub] = useState("");
  const [stackOverflow, setStackOverflow] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = database.ref("users/" + currentUserId);
    user.once("value", (snapshot) => {
      const info = snapshot.val();
      setUser(info);
      setProfilePicture(info.ProfilePicture);
      // setFirstName(info.FirstName);
      // setLastName(info.LastName);
      // setCity(info.City);
      // setDOB(info.DateOfBirth);
      // setCollegeName(info.NameOfCollege);
      // setCollegeYear(info.YearOfCollege);
      // setWorkExperience(info.setWorkExperience);
      // setGitHub(info.GitHub);
      // setStackOverflow(info.StackOverflow);
      // setWebsite(info.Website);
      // setTwitter(info.Twitter);
      // setLinkedIn(info.LinkedIn);
      // setInstagram(info.Instagram);
    });
  }, []);

  const imagePreview = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    const response = await fetch(profilePicture);
    const blob = await response.blob();

    // Storing Image to Firebase Storage
    try {
      setError("");
      setLoading(true);
      setMessage("");
      storage
        .ref(`/profile-pictures/${currentUserId}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("profile-pictures")
            .child(currentUserId)
            .getDownloadURL()
            .then(async (url) => {
              // Storing data and url of image in Realtime database
              const user = {
                ProfilePicture: url,
                FirstName: firstName,
                LastName: lastName,
                City: city,
                DateOfBirth: DOB,
                NameOfCollege: collegeName,
                YearOfCollege: collegeYear,
                WorkExperience: workExperience,
                GitHub: GitHub,
                StackOverflow: stackOverflow,
                Website: website,
                Twitter: twitter,
                LinkedIn: linkedIn,
                Instagram: instagram,
              };
              await database.ref("users/" + currentUserId).update(user);
              setMessage("Account Updated Successfully!");
              // history.push("/dashboard/");
            });
        });
    } catch {
      setError("Problem Occured during updating account! Please try Again");
    }
    setLoading(false);
  };

  return (
    <>
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
      <div className="editprofile-component-header">
        <div className="editprofile-component-title">Profile Details</div>
        <div className="editprofile-component-sub-title">
          The Information will appperar on your public Codingpeer profile.
        </div>
      </div>
      <form onSubmit={updateAccount}>
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="profile-picture"
            onChange={imagePreview}
            style={{ display: "none" }}
          />
          <label htmlFor="profile-picture">
            <img
              src={profilePicture}
              alt={user.FirstName + " " + user.LastName}
              className="userprofile-profilepic"
            />
          </label>
        </div>
        <div className="field">
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
                defaultValue={user.FirstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
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
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                defaultValue={user.LastName}
                required
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
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                defaultValue={user.City}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                // value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                defaultValue={user.DateOfBirth}
                
              />
            </div>
          </div>

          {/* <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              className="form-control"
              id="bio"
              rows="3"
              placeholder="Tell us little bit about yourself"
              // value={skills}
              // onChange={(e) => {
              //   setSkills(e.target.value);
              // }}
            />
          </div> */}
        </div>

        <div className="field">
          <div className="field-title">Education & Work Experience</div>
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
                onChange={(e) => {
                  setCollegeName(e.target.value);
                }}
                defaultValue={user.NameOfCollege}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="yearofcollege" className="form-label">
                Year of College
              </label>
              <select
                className="form-select"
                id="yearofcollege"
                // value={collegeYear}
                onChange={(e) => {
                  setCollegeYear(e.target.value);
                }}
                defaultValue={user.YearOfCollege}
                required
              >
                <option value="" disabled>
                  Year of College
                </option>
                <option value="Not in College">Not in College</option>
                <option value="First year">First Year</option>
                <option value="Second year">Second Year</option>
                <option value="Third year">Third Year</option>
                <option value="Fourth year">Fourth Year</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="workexperience" className="form-label">
              Work Experience in specific field
            </label>
            <input
              type="text"
              className="form-control"
              id="workexperience"
              placeholder="Work Experience in specific field"
              aria-describedby="Exampleworkexperience"
              // value={workExperience}
              onChange={(e) => {
                setWorkExperience(e.target.value);
              }}
              defaultValue={user.WorkExperience}
              
            />
          </div>
        </div>

        <div className="field">
          <div className="field-title">Socials</div>
          <div className="social-title">Coding</div>
          <div className="change-display">
            <div className="mb-3 d-flex">
              <label htmlFor="github" className="col-form-label">
                <i className="fab fa-github social-icon" />
              </label>
              <input
                type="url"
                className="form-control"
                id="github"
                placeholder="GitHub"
                // value={GitHub}
                onChange={(e) => {
                  setGitHub(e.target.value);
                }}
                defaultValue={user.GitHub}
              />
            </div>
            <div className="mb-3 d-flex">
              <label htmlFor="stackoverflow" className="col-form-label">
                <i className="fab fa-stack-overflow social-icon" />
              </label>
              <input
                type="url"
                className="form-control"
                id="stackoverflow"
                placeholder="Stack Overflow"
                // value={stackOverflow}
                onChange={(e) => {
                  setStackOverflow(e.target.value);
                }}
                defaultValue={user.StackOverflow}
              />
            </div>
          </div>

          <div className="social-title">Genral/Social Media</div>
          <div className="change-display">
            <div className="mb-3 d-flex">
              <label htmlFor="website" className="col-form-label">
                <i className="fas fa-link social-icon" />
              </label>
              <input
                type="url"
                className="form-control"
                id="website"
                placeholder="Personal Website"
                // value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
                defaultValue={user.Website}
              />
            </div>
            <div className="mb-3 d-flex">
              <label htmlFor="Linkedin" className="col-form-label">
                <i className="fab fa-linkedin social-icon" />
              </label>
              <input
                type="url"
                className="form-control"
                id="Linkedin"
                placeholder="LinkedIn"
                // value={linkedIn}
                onChange={(e) => {
                  setLinkedIn(e.target.value);
                }}
                defaultValue={user.LinkedIn}
              />
            </div>
          </div>

          <div className="change-display">
            <div className="mb-3 d-flex">
              <label htmlFor="twitter" className="col-form-label">
                <i className="fab fa-twitter social-icon" />
              </label>
              <input
                type="url"
                className="form-control"
                id="twitter"
                placeholder="Twitter"
                // value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
                defaultValue={user.Twitter}
              />
            </div>
            <div className="mb-3 d-flex">
              <label htmlFor="instagram" className="col-form-label">
                <i className="fab fa-instagram social-icon" />
              </label>
              <input
                type="url"
                className="form-control"
                id="instagram"
                placeholder="Instagram"
                // value={instagram}
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
                defaultValue={user.Instagram}
              />
            </div>
          </div>
        </div>

        <button disabled={loading} type="submit" className="btn">
          Save Changes
        </button>
        <Link
          to={"/profile/" + currentUserId + "/"}
          type="button"
          className="btn btn-secondary mx-1"
        >
          Cancel
        </Link>
      </form>
    </>
  );
}