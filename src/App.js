import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./Contexts/Authcontext";
import Home from "./Pages/Home";
import Createaccount from "./Pages/Createaccount";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notifications";
import Profile from "./Pages/Profile";
import Editprofile from "./Pages/Editprofile";
import PageNotFound from "./Pages/PageNotFound";

export default function App() {
  const { currentUser } = useAuth();

  return (
    <div style={{ overflow: "hidden" }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {currentUser ? (
            <Switch>
              <Route exact path="/create-account" component={Createaccount} />
              <PrivateRoute exact path="/dashboard/" component={Dashboard} />
              <PrivateRoute exact path="/messages/" component={Messages} />
              <PrivateRoute
                exact
                path="/notifications/"
                component={Notifications}
              />
              <PrivateRoute
                exact
                path="/profile/:userId/"
                component={Profile}
              />
              <PrivateRoute
                exact
                path="/edit-profile/"
                component={Editprofile}
              />
            </Switch>
          ) : (
            <Redirect to="/" />
          )}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}