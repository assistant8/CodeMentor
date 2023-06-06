import styles from "./quizListPage.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { UserInput } from "../../components/inputs/UserInput";
import { MenuContainer } from "../../components/menuContainer/MenuContainer";
import { QuizListContainer } from "../../components/quizListContainer/QuizListContainer";
import { QuizInput } from "../../components/inputs/QuizInput";
import { useState } from "react";

export default function QuizListPage() {
  const [searchKey, setSearchKey] = useState("");

  const handleSearchClick = (e) => {
    console.log("page", e.target.previousElementSibling.value)
    setSearchKey(e.target.previousElementSibling.value);
    //퀴즈리스트에 보여질 quizs가 filter 됨 
  }
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <QuizInput placeholder="문제 제목 검색" onClick={handleSearchClick}/>
      </div>
      <MenuContainer />
      <QuizListContainer searchKey={searchKey}/>
    </div>
  );
}
