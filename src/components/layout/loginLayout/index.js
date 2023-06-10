import React from "react";
import styles from "./LoginLayout.module.scss";
import { Outlet } from "react-router-dom";

const LoginLayout = ({ children }) => {
  return (
    <div className={styles.FullLogin}>
      <div className={styles.InnerLogin}>{children}</div>
    </div>
  );
};

export default LoginLayout;
