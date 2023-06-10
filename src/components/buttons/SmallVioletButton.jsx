import React from "react";
import styles from './SmallVioletButton.module.scss';

export const SmallVioletButton = React.forwardRef(
  ({ children, onClick }, ref) => {
    return (
      <button ref={ref} className={styles.smallVioletButton} onClick={onClick}>
        {children}
      </button>
    );
  }
);
