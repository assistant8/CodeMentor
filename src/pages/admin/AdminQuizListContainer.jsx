import styles from "./AdminQuizListContainer.module.scss";
import pencil from "../../image/pencil.png";
import deleteOutline from "../../image/delete-outline.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminQuizListContainer ({ searchKey, selectedCategory }) {

  const dummyTest = [ //더미
    {
      id: 1,
      category: "백준", //백준
      title: "토마토",
    },
    {
      id: 2,
      category: "프로그래머스", //프로그래머스
      title: "사과",
    },
    {
      id: 3,
      category: "프로그래머스", //프로그래머스
      title: "큰 수 구하기",
    },
    {
      id: 4,
      category: "프로그래머스", //프로그래머스
      title: "작은 수 구하기",
    },
  ];
  
  const navigate = useNavigate();
  return (
    <div className={styles.quizListContainer}>
      {dummyTest
        .filter((quiz) => selectedCategory==='전체' ? true : quiz.category === selectedCategory)
        .filter((quiz) => quiz.title.includes(searchKey))
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
