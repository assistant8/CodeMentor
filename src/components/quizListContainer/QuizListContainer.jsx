import styles from "./QuizListContainer.module.scss";
import bookmark from "../../image/bookmark.png";
import check from "../../image/check.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { api } from "../../libs/utils/api";

export const QuizListContainer = ({
  style,
  isImgNeed = true,
  searchKey,
  selectedCategory,
  quizs,
}) => {
  const navigate = useNavigate();
  // const quizss = api.get("/problems")
  const categoryNumber = selectedCategory === "백준" ? 0 : 1;

  return (
    <div className={styles.quizListContainer}>
      {quizs
        .filter((quiz) =>
          selectedCategory === "전체" ? true : quiz.category === categoryNumber
        )
        .filter((quiz) => quiz.title.includes(searchKey))
        .map((quiz) => {
          return (
            <div className={styles.quizList}>
              <div
                className={styles.quizListTitle}
                onClick={() =>
                  navigate(PATH.QUIZ + `/${quiz.id}`, { state: quiz })
                }
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

const quizs = [
  {
    id: 1,
    category: 0,
    title: "3085 사탕 게임 - 1",
    problemUrl: "https://www.acmicpc.net/problem/3085",
    difficulty: 3,
    timer: 20,
    createdAt: "2023-06-01T01:00:00.000Z",
    updatedAt: "2023-06-11T18:13:30.000Z",
  },
  {
    id: 2,
    category: 0,
    title: "1107 리모컨",
    problemUrl: "https://www.acmicpc.net/problem/1107",
    difficulty: 4,
    timer: 30,
    createdAt: "2023-06-02T00:30:00.000Z",
    updatedAt: "2023-06-02T05:45:00.000Z",
  },
  {
    id: 3,
    category: 1,
    title: "14500 테트로미노",
    problemUrl: "https://www.acmicpc.net/problem/14500",
    difficulty: 3,
    timer: 20,
    createdAt: "2023-06-03T02:15:00.000Z",
    updatedAt: "2023-06-03T07:20:00.000Z",
  },
  {
    id: 4,
    category: 0,
    title: "6064 카잉 달력",
    problemUrl: "https://www.acmicpc.net/problem/6064",
    difficulty: 4,
    timer: 30,
    createdAt: "2023-06-04T00:00:01.000Z",
    updatedAt: "2023-06-04T04:00:20.000Z",
  },
  {
    id: 5,
    category: 1,
    title: "1748 수 이어 쓰기 1",
    problemUrl: "https://www.acmicpc.net/problem/1748",
    difficulty: 2,
    timer: 15,
    createdAt: "2023-06-04T01:20:20.000Z",
    updatedAt: "2023-06-04T02:05:00.000Z",
  },
  {
    id: 6,
    category: 0,
    title: "9095 1,2,3 더하기",
    problemUrl: "https://www.acmicpc.net/problem/9095",
    difficulty: 1,
    timer: 10,
    createdAt: "2023-06-02T09:30:01.000Z",
    updatedAt: "2023-06-04T03:22:34.000Z",
  },
  {
    id: 7,
    category: 1,
    title: "14501 퇴사",
    problemUrl: "https://www.acmicpc.net/problem/14501",
    difficulty: 2,
    timer: 15,
    createdAt: "2023-06-04T23:56:00.000Z",
    updatedAt: "2023-06-04T23:59:59.000Z",
  },
  {
    id: 8,
    category: 1,
    title: "1248 Guess",
    problemUrl: "https://www.acmicpc.net/problem/1248",
    difficulty: 3,
    timer: 20,
    createdAt: "2023-06-05T00:34:34.000Z",
    updatedAt: "2023-06-05T01:00:01.000Z",
  },
];
