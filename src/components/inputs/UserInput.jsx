import styles from "./UserInput.module.scss";
import React from "react";

export const UserInput = React.forwardRef(
  ({ placeholder, value, onChange, type, name }, ref) => {
    return (
      <input
        className={styles.UserInput}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        ref={ref}
      ></input>
    );
  }
);
