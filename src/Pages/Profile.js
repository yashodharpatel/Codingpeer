import React, { useState, useEffect, useLayoutEffect } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { Link, useHistory } from "react-router-dom";
import { database, storage } from "../firebase";
import Header from "../Components/Header";
import Addproject from "../Components/Addproject";

export default function Profile(props) {
  const { currentUser } = useAuth();
  const uid = currentUser.uid;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [id, setId] = useState();
  const userId = props.match.params.userId;
  const [error, setError] = useState("");

  const [userList, setUserList] = useState([]);

  const history = useHistory();

  const skills = [
    "Html",
    "css",
    "js",
    "react",
    "angular",
    "blah",
    "Html",
    "css",
    "js",
    "react",
  ];

  useEffect(async () => {
    const users = database.ref("users/" + userId);

    await users.once("value", (snapshot) => {
      setUserList(snapshot.val());
    });
  }, []);

  // function deleteUserFromDB() {
  //   database.ref("users/" + userId).remove();
  //   setName("");
  //   setEmail("");
  // }

  // function deleteUserFromStorage() {
  //   storage.ref(`/profile-pictures/${uid}`).delete();
  // }

  // async function handleDelete() {
  //   setError("");

  //   try {
  //     // await database
  //     //   .ref("users/" + userId)
  //     //   .remove()
  //     //   .then(
  //     //     storage
  //     //       .ref(`/profile-pictures/${uid}`)
  //     //       .delete()
  //     //       .then(deleteUser())
  //     //   );
  //     deleteUserFromDB();
  //     deleteUserFromStorage();
  //     await deleteUser();
  //     history.push("/");
  //   } catch {
  //     setError("Failed to delete account");
  //   }
  // }

  return (
    <>
      <Header />
      <div className="user-profilepage">
        <div className="card user-profile">
          <div className="card-body">
            <div className="change-card-display profile-first-section">
              <div className="change-card-display">
                <div>
                  <img
                    src="https://i1.wp.com/devpost-challengepost.netdna-ssl.com/assets/defaults/no-avatar-180.png?ssl=1"
                    // alt={user.FirstName + " profilepicture"}
                    className="userprofile-profilepic"
                  />
                </div>
                <div className="userprofile-details">
                  <div className="user-name userprofile-name">
                    {userList.FirstName} {userList.LastName}
                  </div>
                  <div className="user-email userprofile-email">
                    <i class="fas fa-envelope" />
                    <Link>patelyashodhar012@gmail.com</Link>
                  </div>
                  <div className="userprofile-specialty">
                    <i class="fas fa-tag" />
                    Full Stack Developer
                  </div>
                  <div className="userprofile-city">
                    <i class="fas fa-map-marker-alt" /> Mumbai
                  </div>
                </div>
              </div>
              <div className="editprofile-message-container">
                {userId === uid ? (
                  <div>
                    <div>
                      <Link to="/edit-profile" className="btn btn-primary">
                        Edit Profile & Settings
                      </Link>
                    </div>
                    <div className="mt-2">
                      <Addproject />
                    </div>
                  </div>
                ) : (
                  <Link to="/messages" className="btn btn-primary">
                    Message
                  </Link>
                )}
              </div>
            </div>
            {/* <hr /> */}
            {/* <div className="mt-4 mb-4">
              <div className="change-card-display pt-2 pb-2">
                <div>
                  <div className="userprofile-skills-title">Skills</div>
                </div>
                <div>
                  {skills.map((skill) => (
                    <div className="userprofile-skill">{skill}</div>
                  ))}
                </div>
              </div>
              <div className="change-card-display pt-2 pb-2">
                <div>
                  <div className="userprofile-intrests-title">Intrests</div>
                </div>
                <div>
                  {skills.map((skill) => (
                    <div className="userprofile-intrest">{skill}</div>
                  ))}
                </div>
              </div>
            </div> */}

            <div className="mt-4 mb-4">
              <div className="pt-2 pb-2">
                <div>
                  <div className="userprofile-skills-title">Skills</div>
                </div>
                <div>
                  {skills.map((skill) => (
                    <div className="userprofile-skill">{skill}</div>
                  ))}
                </div>
              </div>
              <div className="pt-2 pb-2">
                <div>
                  <div className="userprofile-intrests-title">Intrests</div>
                </div>
                <div>
                  {userList.Intrests.map((skill) => (
                    <div className="userprofile-intrest">{skill}</div>
                  ))}
                </div>
              </div>
            </div>

            <hr />
            <div className="change-card-display userprofile-socials">
              <div>
                <i class="fas fa-link" />
                <Link className="userprofile-social-link">Website</Link>
              </div>
              <div>
                <i class="fab fa-github" />
                <Link className="userprofile-social-link">GitHub</Link>
              </div>
              <div>
                <i class="fab fa-stack-overflow" />
                <Link className="userprofile-social-link">StakeOverflow</Link>
              </div>
              <div>
                <i class="fab fa-twitter" />
                <Link className="userprofile-social-link">Twitter</Link>
              </div>
              <div>
                <i class="fab fa-linkedin" />
                <Link className="userprofile-social-link">LinkedIn</Link>
              </div>
              <div>
                <i class="fab fa-facebook-square" />
                <Link className="userprofile-social-link">Facebook</Link>
              </div>
              <div>
                <i class="fab fa-instagram" />
                <Link className="userprofile-social-link">Instagram</Link>
              </div>
            </div>

            {/* // {userId === uid ? (
            //   <>
            //     {error && (
            //       <div className="alert alert-danger" role="alert">
            //         {error}
            //       </div>
            //     )}
            //     <div className="w-100 text-center mt-2">
            //       <Link to="/update-profile" className="btn btn-primary">
            //         Update Profile
            //       </Link>
            //     </div>
            //     <div className="w-100 text-center mt-2">
            //       <button className="btn btn-primary" onClick={handleDelete}>
            //         Delete Account
            //       </button>
            //     </div>
            //   </>
            // ) : (
            //   ""
            // )} */}
          </div>
        </div>
      </div>
    </>
  );
}
