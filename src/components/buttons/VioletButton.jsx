import styles from "./VioletButton.module.scss";
import React from "react";

export const VioletButton = React.forwardRef(
  ({ children, onClick, disabled, style }, ref) => {
    return (
      <button
        ref={ref}
        className={styles.violetButton}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        {children}
      </button>
    );
  }
);
