import styles from "./AdminQuizListContainer.module.scss";
import pencil from "../../image/pencil.png";
import deleteOutline from "../../image/delete-outline.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { useState } from "react";

export default function AdminQuizListContainer ({ style, isImgNeed = true, searchKey, selectedCategory }) {
  const navigate = useNavigate();

  const quizs = [ //더미
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

  return (
    <div className={styles.quizListContainer}>
      {quizs
        .filter((quiz) => selectedCategory==='전체' ? true : quiz.category === selectedCategory)
        .filter((quiz) => quiz.title.includes(searchKey))
        .map((quiz) => {
          return (
            <div className={styles.quizList}>
              <div
                className={styles.quizListTitle}
              >
                {quiz.title}
              </div>
                <div className={styles.imageContainer}>
                  <img 
                    src={pencil} 
                    alt="create" 
                    onClick={() => navigate(PATH.ADMIN_UPDATE)} />
                    {/* navigate(PATH.ADMIN_UPDATE+`/:${quiz.id}`) */}
                  <img 
                    src={deleteOutline} 
                    alt="delete"
                    />
                </div>
            </div>
          );
        })}
    </div>
  );
};
