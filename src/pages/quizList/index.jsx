import styles from "./quizList.module.scss";

export default function QuizList() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="문제 제목 검색"
        />
        <button type="button" className={styles.searchButton}></button>
      </div>
    </div>
  );
}
