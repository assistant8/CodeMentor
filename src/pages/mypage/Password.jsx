import styles from "./Password.module.scss";
import { VioletButton } from "../../components/buttons/VioletButton";
import { UserInput } from "../../components/inputs/UserInput";
import { useState, useRef, useEffect } from "react";
import { Modal } from "../../components/modal";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import { api } from "../../libs/utils/api";

const PassWord = () => {
  const email = useRecoilValue(userState).email;
  const [user, setUser] = useState("");
  useEffect(() => {
    api.get(`/users/profile/?email=${email}`).then((res) => setUser(res.data));
  }, []);
  const [newPwd, setNewPwd] = useState("");
  const [checkPattern, setCheckPattern] = useState(false);
  const [checkPwd, setCheckPwd] = useState(false);
  const handlePwd = (e) => {
    setNewPwd(e.target.value);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    if (pattern.test(e.target.value)) {
      setCheckPattern(true);
    } else {
      setCheckPattern(false);
    }
  };
  const handleCheck = (e) => {
    setCheckPwd(e.target.value);
    if ((e.target.value === newPwd) & (e.target.value !== "")) {
      setCheckPwd(true);
    } else {
      setCheckPwd(false);
    }
  };
  const buttonRef = useRef(null);
  const pwdRef = useRef(null);
  const checkRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [modalContent, setModalContent] = useState(""); // 상태 변수 추가
  const handleModalContent = () => {
    if (!checkPattern) {
      setModalContent("영문 대소문자 포함 8~12자리여야 합니다.");
    } else if (!checkPwd) {
      setModalContent("비밀번호가 일치하지 않습니다.");
    } else {
      api
        .put(`/users/profile/?email=${email}`, {
          password: pwdRef.current.value,
        })
        .then(() => {
          setModalContent("비밀번호가 변경되었습니다.");
        })
        .catch((error) => {
          setModalContent(error + "오류가 발생했습니다.");
        });
    }
  };

  const onClick = () => {
    handleModalContent();
    openModal();
  };
  return (
    <div className={styles.pwdContainer}>
      <p className={styles.pwdTitle}>비밀번호 변경</p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputBox}>
          <UserInput
            ref={pwdRef}
            type="password"
            placeholder="비밀번호"
            value={newPwd}
            onChange={handlePwd}
          />
          {!checkPattern ? <p>영문 대소문자 포함 8~12자리</p> : null}
        </div>
        <div className={styles.inputBox}>
          <UserInput
            ref={checkRef}
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleCheck}
          />
          {!checkPwd ? <p>비밀번호가 일치하지 않습니다</p> : null}
        </div>
        <div className={styles.violetButtonWrapper}>
          <VioletButton ref={buttonRef} onClick={onClick}>
            변경하기
          </VioletButton>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default PassWord;
