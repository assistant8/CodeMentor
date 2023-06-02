import styles from "./quizListPage.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { UserInput } from "../../components/inputs/UserInput";
import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { QuizInput } from "../../components/inputs/QuizInput";

export default function QuizListPage() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <QuizInput placeholder="문제 제목 검색"/>
      </div>
      <MenuContainer />
      <QuizListContainer />
    </div>
  );
}
