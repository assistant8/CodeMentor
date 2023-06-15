import QuizListPage from "../../components/quizListPage/quizListPage";
import { useEffect } from "react";
import { api } from "../../libs/utils/api";
import { Modal } from "../../components/modal";
import { useState } from "react";

export default function QuizList() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [modalContent, setModalContent] = useState("");
  const [quizs, setQuizs] = useState([]);
  useEffect(() => {
    api
      .get("/problems")
      .then((res) => setQuizs(res.data))
      .catch((error) => {
        setModalContent(error + "문제 불러오기를 실패했습니다.");
        openModal();
      });
  }, []);

  return (
    <>
      <QuizListPage quizs={quizs} />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
