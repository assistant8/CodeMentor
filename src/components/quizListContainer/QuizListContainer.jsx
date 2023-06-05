import styles from "./QuizListContainer.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

export const QuizListContainer = ({ style, isImgNeed = true, searchKey }) => {
  const navigate = useNavigate();
  const quizs = [
    //더미
    {
      id: 1,
      category: "그래프",
      title: "토마토",
    },
    {
      id: 2,
      category: "구현",
      title: "사과",
    },
  ];
  console.log("searchKey", searchKey)

  return (
    <div className={styles.quizListContainer}>
      {quizs
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
