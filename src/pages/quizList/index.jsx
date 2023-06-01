import styles from "./quizList.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { UserInput } from "../../components/inputs/UserInput";
import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";

export default function QuizList() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <UserInput placeholder="문제 제목 검색"/>
        <button type="button" className={styles.searchButton}></button>
      </div>
      <MenuContainer />
      <QuizListContainer />
    </div>
  );
}
