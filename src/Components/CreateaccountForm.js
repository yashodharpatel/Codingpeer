import React, { useState } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { database, storage } from "../firebase";
import { useHistory } from "react-router-dom";

export default function CreateaccountForm() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;
  const profilePicture =
    "https://i1.wp.com/devpost-challengepost.netdna-ssl.com/assets/defaults/no-avatar-180.png?ssl=1";
  const intrests = [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [DOB, setDOB] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [otherSpecialty, setOtherSpecialty] = useState("");
  const [skills, setSkills] = useState("");
  const [GitHub, setGitHub] = useState("");
  const [stackOverflow, setStackOverflow] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSpecialty = (e) => {
    const { value } = e.target;
    setSpecialty(value);
  };

  const handleIntrests = (e) => {
    const target = e.target;
    var value = target.value;

    if (target.checked) {
      intrests.push(value);
    } else {
      var index = intrests.indexOf(value);
      if (index > -1) {
        intrests.splice(index, 1);
      }
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();

    const response = await fetch(profilePicture);
    const blob = await response.blob();

    // Storing Image to Firebase Storage
    try {
      setError("");
      setLoading(true);
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
                UserId: currentUserId,
                ProfilePicture: url,
                Email: currentUserEmail,
                FirstName: firstName,
                LastName: lastName,
                City: city,
                DateOfBirth: DOB,
                NameOfCollege: collegeName,
                YearOfCollege: collegeYear,
                WorkExperience: workExperience,
                Specialty: specialty === "other" ? otherSpecialty : specialty,
                Skills: skills,
                Intrests: intrests,
                GitHub: GitHub,
                StackOverflow: stackOverflow,
                Website: website,
                Twitter: twitter,
                LinkedIn: linkedIn,
                Instagram: instagram,
              };

              await database.ref("users/" + currentUserId).set(user);
              alert("Account Created Successfully!");
              history.push("/dashboard/");
            });
        });
    } catch {
      setError("Problem Occured during creating account! Try Again");
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
      <form onSubmit={createAccount}>
        <div className="field">
          <div className="field-title">Personal Details</div>
          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="change-display">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City/Town <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City/Town"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
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
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
              />
            </div>
          </div>
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
                value={collegeName}
                onChange={(e) => {
                  setCollegeName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="yearofcollege" className="form-label">
                Year of College <span className="required">*</span>
              </label>
              <select
                className="form-select"
                id="yearofcollege"
                value={collegeYear}
                onChange={(e) => {
                  setCollegeYear(e.target.value);
                }}
                required
              >
                <option value="" disabled defaultValue>
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
              value={workExperience}
              onChange={(e) => {
                setWorkExperience(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="field">
          <div className="field-title">Preferences</div>
          <div className="mb-3">
            <div className="form-label preference-formlabel">
              What's your specialty? <span className="required">*</span>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="Full-stack developer"
                value="Full-stack developer"
                onChange={handleSpecialty}
                required
              />
              <label
                className="form-check-label"
                htmlFor="Full-stack developer"
              >
                Full-stack developer
              </label>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="Front-end developer"
                value="Front-end developer"
                onChange={handleSpecialty}
                required
              />
              <label className="form-check-label" htmlFor="Front-end developer">
                Front-end developer
              </label>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="Back-end developer"
                value="Back-end developer"
                onChange={handleSpecialty}
                required
              />
              <label className="form-check-label" htmlFor="Back-end developer">
                Back-end developer
              </label>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="Mobile developer"
                value="Mobile developer"
                onChange={handleSpecialty}
                required
              />
              <label className="form-check-label" htmlFor="Mobile developer">
                Mobile developer
              </label>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="Data scientist"
                value="Data scientist"
                onChange={handleSpecialty}
                required
              />
              <label className="form-check-label" htmlFor="Data scientist">
                Data scientist
              </label>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="Designer"
                value="Designer"
                onChange={handleSpecialty}
                required
              />
              <label className="form-check-label" htmlFor="Designer">
                Designer
              </label>
            </div>
            <div className="form-check form-check-inline specialty">
              <input
                className="form-check-input"
                type="radio"
                name="specialty"
                id="other"
                value="other"
                onChange={handleSpecialty}
                required
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
          {specialty === "other" ? (
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                id="otherspeaclity"
                placeholder="Type your Specialty"
                value={otherSpecialty}
                onChange={(e) => {
                  setOtherSpecialty(e.target.value);
                }}
                required
              />
            </div>
          ) : (
            ""
          )}

          <div className="mb-4">
            <label htmlFor="skills" className="form-label preference-formlabel">
              What are your skills? <span className="required">*</span>
            </label>
            <textarea
              className="form-control"
              id="skills"
              rows="3"
              value={skills}
              placeholder="Languages, databases, frameworks, API's, and other tools"
              onChange={(e) => {
                setSkills(e.target.value);
              }}
              aria-describedby="skillsdesc"
              required
            />
            <div id="skillsdesc" className="form-text">
              (You can enter multiple skills with each seperated by comma)
            </div>
          </div>

          <div>
            <div className="form-label preference-formlabel">
              Intrests <span className="required">*</span>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="AR/VR"
                value="AR/VR"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="AR/VR">
                AR/VR
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Beginner Friendly"
                value="Beginner Friendly"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Beginner Friendly">
                Beginner Friendly
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Blockchain"
                value="Blockchain"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Blockchain">
                Blockchain
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Cybersecurity"
                value="Cybersecurity"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Cybersecurity">
                Cybersecurity
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Design"
                value="Design"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Design">
                Design
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="DevOps"
                value="DevOps"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="DevOps">
                DevOps
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Fintech"
                value="Fintech"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Fintech">
                Fintech
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Gaming"
                value="Gaming"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Gaming">
                Gaming
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="IoT"
                value="IoT"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="IoT">
                IoT
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Low/No Code"
                value="Low/No Code"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Low/No Code">
                Low/No Code
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Machine Learning/AI"
                value="Machine Learning/AI"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Machine Learning/AI">
                Machine Learning/AI
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Mobile"
                value="Mobile"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Mobile">
                Mobile
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Music/Art"
                value="Music/Art"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Music/Art">
                Music/Art
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Quantam Programming"
                value="Quantam Programming"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Quantam Programming">
                Quantam Programming
              </label>
            </div>
            <div className="form-check form-check-inline intrest">
              <input
                className="form-check-input"
                type="checkbox"
                id="Web"
                value="Web"
                onChange={handleIntrests}
              />
              <label className="form-check-label" htmlFor="Web">
                Web
              </label>
            </div>
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
                value={GitHub}
                onChange={(e) => {
                  setGitHub(e.target.value);
                }}
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
                value={stackOverflow}
                onChange={(e) => {
                  setStackOverflow(e.target.value);
                }}
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
                value={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
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
                value={linkedIn}
                onChange={(e) => {
                  setLinkedIn(e.target.value);
                }}
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
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
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
                value={instagram}
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="btn submitbtn"
        >
          Submit
        </button>
      </form>
    </>
  );
}