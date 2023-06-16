import QuizListPage from "../../components/quizListPage/quizListPage";
import { api } from "../../libs/utils/api";
import { userState } from "../../state/userState";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { Modal } from "../../components/modal";

const BookMark = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [modalContent, setModalContent] = useState("");
  const [quizs, setQuizs] = useState([]);
  const user = useRecoilValue(userState);
  useEffect(() => {
    console.log("quizs 1 : ", quizs);
    api
      .get(`/user-problem/saved/?email=${user.email}`)
      .then((res) => {
        console.log(res);
        setQuizs(res.data);
        console.log("res.data : ", quizs);
      })
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
};
export default BookMark;
