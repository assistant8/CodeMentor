import React from "react";
import styles from "./LoginLayout.module.scss";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className={styles.Full}>
      <div className={styles.Inner}>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
