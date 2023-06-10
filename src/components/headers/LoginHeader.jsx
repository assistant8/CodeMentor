import React from "react";
import styles from "./LoginHeader.module.scss";

export const LoginHeader = React.forwardRef(({ children, style }, ref) => {
  return (
    <div className={styles.LoginHeader} style={style} ref={ref}>
      {children === "logo" ? "/*CodeWhisper*/" : children}
    </div>
  );
});
