import styles from "./quizList.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";

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
      <div className={styles.menuContainer}>
        <div className={styles.categoryContainer}>
          <ul>
            <li>전체</li>
            <li>백준</li>
            <li>프로그래머스</li>
          </ul>
        </div>
        <div className={styles.imageContainer}>
          <img src={bookmark} alt="bookmark" />
          <img src={check} alt="check" />
        </div>
      </div>
      <div className={styles.quizListContainer}>
        <div className={styles.quizList}>
          <div className={styles.quizListTitle}>백준 7596번 - 토마토가 이렇게 되지 않았는</div>
          <div className={styles.imageContainer}>
            <img src={bookmark} alt="bookmark" />
            <img src={check} alt="check" />
          </div>
        </div>
        <div className={styles.quizList}>
          <div className={styles.quizListTitle}>백준 7596번 - 토마토</div>
          <div className={styles.imageContainer}>
            <img src={bookmark} alt="bookmark" />
            <img src={check} alt="check" />
          </div>
        </div>
      </div>
    </div>
  );
}
