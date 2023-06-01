import styles from "./quizList.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { UserInput } from "../../components/inputs/UserInput";
import { MenuContainer } from "../../components/menuContainer/MenuContainer";

export default function QuizList() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <UserInput placeholder="문제 제목 검색"/>
        <button type="button" className={styles.searchButton}></button>
      </div>
      <MenuContainer />
      <div className={styles.quizListContainer}>
        <div className={styles.quizList}>
          <div className={styles.quizListTitle}>백준 7596번 - 토마토가 이렇게 되지 않았는</div>
          <div className={styles.imageContainer}>
            <img src={bookmark} alt="bookmark" />
            <img src={check} alt="check" />
          </div>
        </div>
      </div>
    </div>
  );
}
