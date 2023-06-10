import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:3000/api/;

const authToken = localStorage.getItem("authToken");

axios.defaults.headers.common.Authorization =
  authToken !== "" ? `Bearer ${authToken}` : null;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
