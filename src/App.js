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
import BookMark from "./pages/mypage/BookMark";
import Complete from "./pages/mypage/Complete";
import Chart from "./pages/mypage/Chart";
import MyPost from "./pages/mypage/MyPost";
import Login from "./pages/login/Login";
// import ByEmail from "./pages/login/Login";
import FindPassword from "./pages/login/FindPassword";
import Register from "./pages/login/Register";
import VerifyEmail from "./pages/login/VerifyEmail";

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
          {/* <Route path="by-email" element={<ByEmail />} /> */}
          <Route path="find-password" element={<FindPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
        <Route path={PATH.MYPAGE} element={<MainLayout />}>
          <Route index element={<MyPage />} />
          <Route path="modify" element={<ModifyUser />} />
          <Route path="password" element={<PassWord />} />
          <Route path="bookmark" element={<BookMark />} />
          <Route path="complete" element={<Complete />} />
          <Route path="chart" element={<Chart />} />
          <Route path="mypost" element={<MyPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
