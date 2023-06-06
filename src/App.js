import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
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
import FindPassword from "./pages/login/FindPassword";
import Register from "./pages/login/Register";
import VerifyEmail from "./pages/login/VerifyEmail";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import CreateProfile from "./pages/login/CreateProfile";
import { useEffect, useMemo, useState } from "react";

const AppLayout = () => {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(false); //첫 화면 로그인인데 괜찮으려나

  useEffect(() => {
    if (location.pathname.includes("login")) {
      setIsLoginPage(true);
    } else setIsLoginPage(false);
  }, [location.pathname]);

  const Layout = useMemo(() => {
    return isLoginPage ? (
      <LoginLayout>
        <Outlet />
      </LoginLayout>
    ) : (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }, [isLoginPage]);

  return <>{Layout}</>;
};

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<QuizList />} />
        <Route path={PATH.QUIZ} element={<Quiz />} />
        <Route path={PATH.QUIZLIST} element={<QuizList />} />

        <Route path={PATH.LOGIN}>
          <Route index element={<Login />} />
          <Route path="find-password" element={<FindPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="create-profile" element={<CreateProfile />} />
        </Route>

        <Route path={PATH.MYPAGE}>
          <Route index element={<MyPage />} />
          <Route path="modify" element={<ModifyUser />} />
          <Route path="password" element={<PassWord />} />
          <Route path="bookmark" element={<BookMark />} />
          <Route path="complete" element={<Complete />} />
          <Route path="chart" element={<Chart />} />
          <Route path="mypost" element={<MyPost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
