import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
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
import Login from "./pages/login/Login";
import FindPassword from "./pages/login/FindPassword";
import Register from "./pages/login/Register";
import VerifyEmail from "./pages/login/VerifyEmail";
import ResetPassword from "./pages/login/ResetPassword.jsx";
import CreateProfile from "./pages/login/CreateProfile";
import { useEffect, useMemo, useState } from "react";
import ProblemAdminPage from "./pages/admin";
import ProblemCreatePage from "./pages/adminCreate";
import ProblemUpdatePage from "./pages/adminUpdate";
import Home from "./pages/home";

const AppLayout = () => {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(false); //첫 화면 로그인이니 수정

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
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = localStorage.getItem("isLogin") === "true" ? true : false;
  // const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    if (!isLogin && !location.pathname.includes("/login")) {
      // alert("로그인이 필요한 페이지입니다.");
      navigate("/login");

      return;
    } else if (isLogin && location.pathname.includes("/login")) {
      navigate("/");

      return;
    }
  }, [location.pathname, isLogin]);

  return (
    <Routes>
      {isLogin && (
        <>
          <Route element={<AppLayout />}>
            <Route path="/" element={<QuizList />} />
            <Route path={PATH.QUIZ + `/:quizId`} element={<Quiz />} />
            <Route path={PATH.QUIZLIST} element={<QuizList />} />
            <Route path={PATH.HOME} element={<Home />} />

            <Route path={PATH.MYPAGE}>
              <Route index element={<MyPage />} />
              <Route path="modify" element={<ModifyUser />} />
              <Route path="password" element={<PassWord />} />
              <Route path="bookmark" element={<BookMark />} />
              <Route path="complete" element={<Complete />} />
              <Route path="chart" element={<Chart />} />
            </Route>

            <Route path={PATH.ADMIN}>
              <Route index element={<ProblemAdminPage />} />
              <Route path="create" element={<ProblemCreatePage />} />
              <Route path="update" element={<ProblemUpdatePage />} />
            </Route>
          </Route>
        </>
      )}
      {!isLogin && (
        <>
          <Route path={PATH.LOGIN}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="create-profile" element={<CreateProfile />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
