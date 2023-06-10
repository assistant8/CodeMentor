import React from "react";
import styles from "./LoginTextLink.module.scss";

export const LoginTextLink = React.forwardRef(
  ({ children, style, onClick }, ref) => {
    return (
      <div
        className={styles.LoginTextLink}
        style={style}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
