import styles from "./AdminQuizListContainer.module.scss";
import pencil from "../../image/pencil.png";
import deleteOutline from "../../image/delete-outline.png";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

export default function AdminQuizListContainer ({ searchKey, selectedCategory }) {
  
// problem reserved schema
const dummyTest =  [
  {
    "id": 1,
    "category": 0,
    "title": "3085 사탕 게임 - 1",
    "problemUrl": "https://www.acmicpc.net/problem/3085",
    "difficulty": 3,
    "timer": 20,
    "createdAt": "2023-06-01T01:00:00.000Z",
    "updatedAt": "2023-06-11T18:13:30.000Z"
    },
  {
    "id": 4,
    "category": 1,
    "title": "6064 카잉 달력",
    "problemUrl": "https://www.acmicpc.net/problem/6064",
    "difficulty": 4,
    "timer": 30,
    "createdAt": "2023-06-04T00:00:01.000Z",
    "updatedAt": "2023-06-04T04:00:20.000Z"
    },
  ];

  const [quizes, setQuizes] = useState([]);

  const getQuizes = useCallback(() => {
    // 모든 문제를 DB로 받아옴
    const getAllQuizes = dummyTest; // api.get("/api/problems")
    
    // 화면에 표시될 문제를 filter함
    const filteredQuizes = getAllQuizes
        .filter( (quiz) => selectedCategory==='전체' ? true : quiz.category === selectedCategory ) // 선택된 카테고리로 분류하고
        .filter( (quiz) => quiz.title.includes(searchKey) );       // 검색어로 한번 더 분류하기
    // 분류된 퀴즈를 상태값으로 변경
    setQuizes(filteredQuizes);

  },[setQuizes, selectedCategory, searchKey]);

  useEffect(() => getQuizes(),[selectedCategory, searchKey]);

  const navigate = useNavigate();
  return (
    <div className={styles.quizListContainer}>
      {quizes
        .map((quiz) => {
          return (
            <div className={styles.quizList} key={quiz.id}>
              <div
                className={styles.quizListTitle}
              >
                {quiz.title}
              </div>
              <div className={styles.imageContainer}>
                  <img 
                    src={pencil} 
                    alt="create"
                    onClick={() => navigate('/admin/update')} 
                    />
                    
                  <img 
                    src={deleteOutline} 
                    alt="delete"
                    // 모달로 예(-> 데이터 삭제) , 아니오(뒤로가기)를 구현해야 함
                    onClick={() => {alert(`${quiz.title}을 삭제하시겠습니까?`)}}
                    />
              </div>
            </div>
          );
        })}
    </div>
  );
};
