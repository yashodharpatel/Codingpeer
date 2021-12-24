import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { database } from "../firebase";
import Usercard from "../Components/Usercard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  // const [error, setError] = useState("");
  const uid = currentUser.uid;

  useEffect(() => {
    const users = database.ref("users");

    users.on("value", (snapshot) => {
      const info = snapshot.val();

      const userlist = [];
      for (let id in info) {
        userlist.push(info[id]);
      }

      setUserList(userlist);
    });
  }, []);

  return (
    <>
      {/* {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )} */}
      <Header />
      <div className="dashboard">
        <div className="form-control d-flex align-items-center set-width-1000">
          <i className="fa fa-search" />
          <input
            type="text"
            className="form-control"
            style={{ border: "none" }}
            placeholder="Search users by names, specialty, skills or intrests."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        {userList
          ? userList
              .filter((user) => {
                if (search === " ") {
                  return user;
                } else if (
                  Object.values(user)
                    // .splice(0, 2)
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) =>
                uid === user.UserId ? (
                  ""
                ) : (
                  <div>
                    <Usercard user={user} key={user.uid}/>
                  </div>
                )
              )
          : ""}
      </div>
      <div className="footer-display">
        <Footer />
      </div>
    </>
  );
}