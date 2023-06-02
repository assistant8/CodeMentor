import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { UserInput } from "../../components/inputs/UserInput";
import styles from "./BookMark.module.scss";

const BookMark = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <UserInput placeholder="문제 제목 검색" />
        <button type="button" className={styles.searchButton}></button>
      </div>
      <MenuContainer />
      <QuizListContainer />
    </div>
  );
};
export default BookMark;
