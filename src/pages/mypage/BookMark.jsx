import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { QuizInput } from "../../components/inputs/QuizInput";
import styles from "./BookMark.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";
import QuizListPage from "../../components/quizListPage/quizListPage";

const BookMark = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("내가 찜한 문제");
  }, [setHeaderTitle]);

  return (
    <>
      <QuizListPage />
    </>
  );
};
export default BookMark;
