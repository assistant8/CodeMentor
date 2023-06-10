import AdminQuizListContainer from './AdminQuizListContainer.jsx';
import { QuizInput } from '../../components/inputs/QuizInput';
import { AdminMenuContainer } from './AdminMenuContainer.jsx';
import { useState, useCallback } from 'react';
import styles from "./admin.module.scss";


export default function ProblemAdminPage() {

  // searchKey = 검색창에 입력한 검색값 
  const [searchKey, setSearchKey] = useState("");
  // 백준 | 프로그래머스
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleSearchClick = (e) => {
    console.log("page", e.target.previousElementSibling.value)
    setSearchKey(e.target.previousElementSibling.value);
    //퀴즈리스트에 보여질 quizs가 filter 됨 
  }

  // 카테고리를 누르게 클릭하면 그 카데고리로 selectedCategory값이 변경됨
  const handleCategoryClick = useCallback((c)=>{ 
    setSelectedCategory(c);
  }, [])
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <QuizInput placeholder="문제 제목 검색" onClick={handleSearchClick}/>
        </div>
        <AdminMenuContainer onClick={handleCategoryClick} category={selectedCategory}/>
        <AdminQuizListContainer searchKey={searchKey} selectedCategory={selectedCategory}/> 
      </div>

    </>
  );
}