import { headerTitleState } from '../../state/headerTitleState';
import { useSetRecoilState } from 'recoil';
import AdminQuizListContainer from './AdminQuizListContainer.jsx';
import { QuizInput } from '../../components/inputs/QuizInput';
import { AdminMenuContainer } from './AdminMenuContainer.jsx';
import { useState, useCallback } from 'react';
import styles from "../../components/quizListPage/quizListPage.module.scss";


export default function ProblemAdminPage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);
  // useEffect를 굳이 사용하지 않아도 setHeaderTitle만 변경해도 useEffect가 자동으로 적용되는 듯??
  // 다른분들은 useEffect(()=>{set~~("")},[set~])로 설정하시던데 그 이유는 무엇인지 궁금
  setHeaderTitle('문제 관리');

  const [searchKey, setSearchKey] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleSearchClick = (e) => {
    console.log("page", e.target.previousElementSibling.value)
    setSearchKey(e.target.previousElementSibling.value);
    //퀴즈리스트에 보여질 quizs가 filter 됨 
  }

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