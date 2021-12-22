import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./Contexts/Authcontext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/style.css";
import "./CSS/responsive.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);