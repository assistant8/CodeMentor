import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PATH from "./constants/path";
import MainLayout from "./components/layout/mainLayout";
import LoginLayout from "./components/layout/loginLayout";
import Quiz from "./pages/quiz";
import QuizList from "./pages/quizList";
import SelectWayToLogin from "./components/login/SelectWayToLogin";
import ByEmail from "./components/login/ByEmail";
import FindPassword from "./components/login/FindPassword";
import Register from "./components/login/Register";
import VerifyEmail from "./components/login/VerifyEmail";

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
          <Route index element={<SelectWayToLogin />} />
          <Route path="by-email" element={<ByEmail />} />
          <Route path="find-password" element={<FindPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
