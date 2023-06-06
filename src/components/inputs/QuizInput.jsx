import { useState } from "react";
import styles from "./QuizInput.module.scss";

export const QuizInput = ({ style, placeholder, value, onChange, type, onClick }) => {
  const [keyword, setKeyword] = useState("");
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }
  
  return (
    <>
      <input
        className={styles.UserInput}
        type={type}
        style={style}
        placeholder={placeholder}
        value={keyword}
        onChange={handleInputChange}
      ></input>
      <button type="button" className={styles.searchButton} onClick={onClick}></button>
    </>
  );
};
