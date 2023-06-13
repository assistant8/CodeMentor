import AdminQuizListContainer from './AdminQuizListContainer.jsx';
import { QuizInput } from '../../components/inputs/QuizInput';
import { AdminMenuContainer } from './AdminMenuContainer.jsx';
import { useState, useCallback } from 'react';
import styles from "./admin.module.scss";
import { useRecoilState } from 'recoil';
import { categoryState, searchKeyState } from '../../state/store.js';


export default function ProblemAdminPage() {

  // searchKey = 검색창에 입력한 검색값 
  const [searchKey, setSearchKey] = useRecoilState(searchKeyState);
  // 0(백준) | 1(프로그래머스)
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  // [코드리뷰] handleSearchClick => useCallback [setSearchKey]
  const handleSearchClick = useCallback((e) => {
    setSearchKey(e.target.previousElementSibling.value);
    //퀴즈리스트에 보여질 quizs가 filter 됨 
  }, [setSearchKey]);
  
  // 카테고리를 누르게 클릭하면 그 카데고리로 selectedCategory값이 변경됨
  const handleCategoryClick = useCallback((category)=>{ 
    setSelectedCategory(category);
  }, [setSelectedCategory]);
  
  // [코드리뷰] 이 부분도 마찬가지로 
  // selectedCategory 상태를 공유해야되는 컴포넌트가 늘어날 것을 생각하면, 
  // 직접 props를 내려주기 보다는 recoil을 통해 관리하는게 좋을 것 같습니다.
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