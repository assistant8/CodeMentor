import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PATH from "./constants/path";
import MainLayout from "./components/layout/mainLayout";
import LoginLayout from "./components/layout/loginLayout";
import Quiz from "./pages/quiz";
import QuizList from "./pages/quizList";
import MyPage from "./pages/mypage";
import ModifyUser from "./pages/mypage/ModifyUser";
import PassWord from "./pages/mypage/Password";

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
          <Route index element={<QuizList />} />
          {/* 로그인 회원가입은 헤더 nav바 따로 없어서 레이아웃을 따로 만들었습니다 이쪽 구현 후  element에 넣어주시고 주석 지우시면 될것같습니다 */}
        </Route>
        <Route path={PATH.MYPAGE} element={<MainLayout />}>
          <Route index element={<MyPage />} />
          <Route path="modify" element={<ModifyUser />} />
          <Route path="password" element={<PassWord />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
