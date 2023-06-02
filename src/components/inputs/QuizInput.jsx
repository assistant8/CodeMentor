import styles from "./QuizInput.module.scss";

export const QuizInput = ({ style, placeholder, value, onChange, type }) => {
  return (
    <>
      <input
        className={styles.UserInput}
        type={type}
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
      <button type="button" className={styles.searchButton}></button>
    </>
  );
};
