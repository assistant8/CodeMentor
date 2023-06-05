import styles from "./quizList.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { UserInput } from "../../components/inputs/UserInput";
import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { QuizInput } from "../../components/inputs/QuizInput";
import QuizListPage from "../../components/quizListPage/quizListPage";

export default function QuizList() {
  return (
    <>
      <QuizListPage />
    </>
  );
}
