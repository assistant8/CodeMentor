import styles from "./InputWithEditButton.module.scss";
import React from "react";
import { UserInput } from "./UserInput.jsx";

export const InputWithEditButton = React.forwardRef(
  (
    {
      placeholder,
      value,
      onChange,
      type,
      name,
      maxLength,
      onKeyDown,
      disabled,

      editButton_showState,
      editButton_onClick,
      editButton_style,
      editButton_children,
    },
    ref
  ) => {
    return (
      <div className={styles.wrapper}>
        <UserInput
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          ref={ref}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
          disabled={disabled}
        ></UserInput>
        {editButton_showState ? (
          <>
            <div
              className={styles.editButton}
              onClick={editButton_onClick}
              style={editButton_style}
            >
              {editButton_children}
            </div>
          </>
        ) : null}
      </div>
    );
  }
);
