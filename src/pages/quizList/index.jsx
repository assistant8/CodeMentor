import QuizListPage from "../../components/quizListPage/quizListPage";
import { useEffect, useState } from "react";
import { api } from "../../libs/utils/api";

export default function QuizList() {
  const [quizs, setQuizs] = useState([]);
  useEffect(() => {
    api.get("/problems").then((res) => setQuizs(res.data));
  }, []);

  return (
    <>
      <QuizListPage quizs={quizs} />
    </>
  );
}
