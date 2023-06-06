import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { UserInput } from "../../components/inputs/UserInput";
import styles from "./BookMark.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";

const Complete = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(()=>{
    setHeaderTitle("내가 푼 문제")
  }, [setHeaderTitle]);

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
export default Complete;
