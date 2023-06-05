import React from "react";
import "./LoginLayout.module.scss";
import { Outlet } from "react-router-dom";

const LoginLayout = ({children}) => {
  return (
    <div className="FullLogin">
      <div className="InnerLogin">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
