import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PATH from "./constants/path";
import MainLayout from "./components/layout/mainLayout";
import Quiz from "./pages/quiz";
import QuizList from "./pages/quizList";

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
      </Routes>
    </Router>
  );
}

export default App;
