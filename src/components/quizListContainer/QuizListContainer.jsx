import styles from "./QuizListContainer.module.scss"
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";

export const QuizListContainer = ({ style }) => {
  return (
    <div className={styles.quizListContainer}>
      <div className={styles.quizList}>
        <div className={styles.quizListTitle}>
          백준 7596번 - 토마토가 이렇게 되지 않았는데
        </div>
        <div className={styles.imageContainer}>
          <img src={bookmark} alt="bookmark" />
          <img src={check} alt="check" />
        </div>
      </div>
    </div>
  );
};
