import styles from "./UserInput.module.scss";

export const UserInput = ({ style, placeholder, value, onChange, type }) => {
  return (
    <input
      className={styles.UserInput}
      type={type}
      style={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};
