import styles from "./VioletButton.module.scss";
import React from "react";

export const VioletButton = React.forwardRef(
  ({ children, style, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className={styles.violetButton}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
