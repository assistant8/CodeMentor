import styles from "./InputWithIndicator.module.scss";
import React from "react";
import check from "../../image/check.png";

export const InputWithIndicator = React.forwardRef(
  (
    {
      placeholder,
      value,
      onChange,
      type,
      name,
      maxLength,
      onKeyDown,
      indicatorController,
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
        ></input>
        <div
          className={styles.indicator}
          style={{
            backgroundColor: `${
              indicatorController === true ? "#6700e6" : "whitesmoke"
            }`,
          }}
        >
          <img className={styles.indicator_image} src={check} alt="" />
        </div>
      </div>
    );
  }
);
