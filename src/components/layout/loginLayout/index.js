import React from "react";
import "./LoginLayout.scss";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="FullLogin">
        <div className="InnerLogin">
            <Outlet />
        </div>
    </div>
  );
};

export default LoginLayout;
