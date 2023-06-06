import styles from "./quizList.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { UserInput } from "../../components/inputs/UserInput";
import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { QuizInput } from "../../components/inputs/QuizInput";
import QuizListPage from "../../components/quizListPage/quizListPage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";

export default function QuizList() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(()=>{
    setHeaderTitle("문제 리스트")
  }, [setHeaderTitle]);
  
  return (
    <>
      <QuizListPage />
    </>
  );
}
