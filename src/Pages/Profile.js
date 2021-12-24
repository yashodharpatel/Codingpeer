import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import Header from "../Components/Header";
import Addproject from "../Components/Addproject";
import Footer from "../Components/Footer";

export default function Profile(props) {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const userId = props.match.params.userId;
  const [user, setUser] = useState([]);
  // const [error, setError] = useState("");

  useEffect(() => {
    const user = database.ref("users/" + userId);
    user.once("value", (snapshot) => {
      setUser(snapshot.val());
    });
  }, []);

  return (
    <>
      <Header className="set-width-1200" />
      <div className="user-profilepage">
        <div className="card user-profile set-width-1200">
          <div className="card-body">
            <div className="change-card-display profile-first-section">
              <div className="change-card-display userprofile-imagename-container">
                <div>
                  <img
                    src={user.ProfilePicture}
                    alt={user.FirstName + " " + user.LastName}
                    className="userprofile-profilepic"
                  />
                </div>
                <div className="userprofile-details">
                  <div className="user-name userprofile-name">
                    {user.FirstName} {user.LastName}
                  </div>
                  {/* <div className="user-email userprofile-email">
                    <i className="fas fa-envelope" />
                    <Link>{user.Email}</Link>
                  </div> */}
                  <div className="userprofile-specialty">{user.Specialty}</div>
                </div>
              </div>

              <div className="userprofile-socials">
                {user.Email && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.Email}
                    </Link>
                    <i className="fas fa-envelope" />
                  </div>
                )}
                {user.City && (
                  <div>
                    <span className="userprofile-social-link">{user.City}</span>
                    <i className="fas fa-map-marker-alt" />
                  </div>
                )}
                {user.GitHub && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.GitHub.replace("https://", "")}
                    </Link>
                    <i className="fab fa-github" />
                  </div>
                )}
                {user.StackOverflow && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.StackOverflow.replace("https://", "")}
                    </Link>
                    <i className="fab fa-stack-overflow" />
                  </div>
                )}
                {user.Website && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.Website.replace("https://", "")}
                    </Link>
                    <i className="fas fa-link" />
                  </div>
                )}
                {user.LinkedIn && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.LinkedIn.replace("https://www.", "")}
                    </Link>
                    <i className="fab fa-linkedin" />
                  </div>
                )}
                {user.Twitter && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.Twitter.replace("https://", "")}
                    </Link>
                    <i className="fab fa-twitter" />
                  </div>
                )}
                {user.Instagram && (
                  <div>
                    <Link to="#" className="userprofile-social-link">
                      {user.Instagram.replace("https://www.", "")}
                    </Link>
                    <i className="fab fa-instagram" />
                  </div>
                )}
              </div>
            </div>

            <div className="userprofile-section">
              <div>
                <div className="userprofile-section-titles">SKILLS</div>
              </div>
              <div className="userprofile-skills">
                {user.Skills &&
                  user.Skills.split(",").map((skill) => (
                    <div className="userprofile-skill"> {skill}</div>
                  ))}
              </div>
            </div>

            <div className="userprofile-section">
              <div>
                <div className="userprofile-section-titles">INTRESTS</div>
              </div>
              <div className="userprofile-intrests">
                {user.Intrests &&
                  user.Intrests.map((intrest) => (
                    <div className="userprofile-intrest"> {intrest}</div>
                  ))}
              </div>
            </div>

            <div className="userprofile-section">
              <div className="userprofile-section-titles">PROJECTS</div>
              {user.projects
                ? Object.values(user.projects).map((project) => (
                    <div className="projects">
                      <div className="userprofile-projectName">
                        {project.projectName} (10/2021 - 11/2021)
                      </div>
                      {(project.projectURL || project.projectDesc) && (
                        <ul>
                          {project.projectURL && (
                            <li className="userprofile-projectURL">
                              <Link to="#">{project.projectURL}</Link>
                            </li>
                          )}
                          {project.projectDesc && (
                            <li className="userprofile-projectDesc">
                              {project.projectDesc}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  ))
                : ""}
              <div className="addproject-btn">
                {userId === currentUserId ? <Addproject /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-display">
        <Footer />
      </div>
    </>
  );
}