import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PATH from "./constants/path";
import MainLayout from "./components/layout/mainLayout";
import LoginLayout from "./components/layout/loginLayout";
import Quiz from "./pages/quiz";
import QuizList from "./pages/quizList";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<QuizList />} />
        </Route>
        <Route path={PATH.QUIZ} element={<MainLayout />}>
          <Route index element={<Quiz />} />
        </Route>
        <Route path={PATH.QUIZLIST} element={<MainLayout />}>
          <Route index element={<QuizList />} />
        </Route>
        <Route path={PATH.LOGIN} element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path=":stage" element={<Login />} />

          {/* 로그인 회원가입은 헤더 nav바 따로 없어서 레이아웃을 따로 만들었습니다 이쪽 구현 후  element에 넣어주시고 주석 지우시면 될것같습니다 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
