import styles from "./QuizListContainer.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

export const QuizListContainer = ({ style, isImgNeed = true, searchKey, selectedCategory }) => {
  const navigate = useNavigate();
  const quizs = [ //더미
    {
      id: 1,
      category: "백준", //백준
      title: "토마토",
    },
    { ////////////////////////////부모 자식 프롭스로 함수 전달 익히기
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
                onClick={() => navigate(PATH.QUIZ)} //navigate(PATH.QUIZ+`/:${quiz.id}`)
              >
                {quiz.title}
              </div>
              {isImgNeed && (
                <div className={styles.imageContainer}>
                  <img src={bookmark} alt="bookmark" />
                  <img src={check} alt="check" />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
