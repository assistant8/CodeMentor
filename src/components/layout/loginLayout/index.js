import React from "react";
import "./LoginLayout.scss";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="Full">
      <div className="Inner">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
