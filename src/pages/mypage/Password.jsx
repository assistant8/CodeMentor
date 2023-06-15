import styles from "./Password.module.scss";
import { VioletButton } from "../../components/buttons/VioletButton";
import { UserInput } from "../../components/inputs/UserInput";
import { useState, useRef, useCallback } from "react";
import { Modal } from "../../components/modal";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import { api } from "../../libs/utils/api";

const PassWord = () => {
  const user = useRecoilValue(userState);
  const [newPwd, setNewPwd] = useState("");
  const [comparePresent, setComparePresent] = useState(false);
  const [checkPattern, setCheckPattern] = useState(false);
  const [checkPwd, setCheckPwd] = useState(false);
  const handleCompare = useCallback(() => {
    if (user.password === presentPwdRef.current.value) {
      setComparePresent(true);
    } else {
      setComparePresent(false);
    }
  }, [user.password, setComparePresent]);
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
  const presentPwdRef = useRef(null);
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
    if (!comparePresent) {
      setModalContent("현재 비밀번호가 일치하지 않습니다.");
    } else if (!checkPattern) {
      setModalContent("영문 대소문자 포함 8~12자리여야 합니다.");
    } else if (!checkPwd) {
      setModalContent("비밀번호가 일치하지 않습니다.");
    } else {
      api
        .put(`/users/profile/${user.email}`, {
          ...user,
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
            ref={presentPwdRef}
            type="password"
            onChange={handleCompare}
            placeholder="현재 비밀번호"
          />
          {!comparePresent ? <p>현재 비밀번호와 일치하지 않습니다.</p> : null}
        </div>
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
