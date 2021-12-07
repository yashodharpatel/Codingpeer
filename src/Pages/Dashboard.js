import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/Authcontext";
import { database } from "../firebase";
import Usercard from "../Components/Usercard";
import Header from "../Components/Header";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
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
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Header search={search} setSearch ={setSearch} displaySearch={false}/>
      {/* <div className="d-flex flex-row justify-content-center"> */}
      {userList
        ? userList
            .filter((user) => {
              if (search === " ") {
                return user;
              } else if (
                Object.values(user)
                  .splice(0, 2)
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
                  {/* <Link to={"/user/" + user.UserId}> */}
                  <Usercard user={user}/>
                  {/* </Link> */}
                </div>
              )
            )
        : ""}


      {/* </div> */}

      {/* <div className="w-100 text-center mt-2">
        <button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className="w-100 text-center mt-2">
        <Link to={"/user/" + uid} className="btn btn-primary">
          Profile
        </Link>
      </div> */}
    </>
  );
}
