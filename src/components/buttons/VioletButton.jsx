import styles from "./VioletButton.module.scss";
import React from "react";

export const VioletButton = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <button ref={ref} className={styles.violetButton} onClick={onClick}>
      {children}
    </button>
  );
});
