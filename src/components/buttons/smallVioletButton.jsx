import styles from "./smallVioletButton.module.scss";
import React from "react";

export const SmallVioletButton = React.forwardRef(
  ({ children, onClick }, ref) => {
    return (
      <button ref={ref} className={styles.smallVioletButton} onClick={onClick}>
        {children}
      </button>
    );
  }
);
