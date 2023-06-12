import styles from "./InputWithEditButton.module.scss";
import React from "react";
import check from "../../image/check.png";

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
      buttonOnClick,
      showEditButtonState,
      disabled,
    },
    ref
  ) => {
    return (
      <div className={styles.wrapper}>
        <input
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
        ></input>
        {showEditButtonState ? (
          <>
            <div
              className={styles.button}
              onClick={buttonOnClick}
              style={{ cursor: "pointer" }}
            >
              수정
            </div>
          </>
        ) : null}
      </div>
    );
  }
);
