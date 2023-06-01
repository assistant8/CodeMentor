import styles from "./Password.module.scss";
import { VioletButton } from "../../components/buttons/VioletButton";
import { useState } from "react";

const PassWord = () => {
  const [newPwd, setNewPwd] = useState("");
  const [checkPattern, setCheckPattern] = useState(false);
  const [checkPwd, setCheckPwd] = useState(true);
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
    if (e.target.value === newPwd) {
      setCheckPwd(true);
    } else {
      setCheckPwd(false);
    }
  };
  const onClick = () => {
    console.log("제출됨");
  };
  return (
    <div className={styles.pwdContainer}>
      <p className={styles.pwdTitle}>비밀번호 변경</p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputBox}>
          <input placeholder="현재 비밀번호" />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="비밀번호"
            value={newPwd}
            onChange={handlePwd}
          />
          {!checkPattern ? <p>영문 대소문자 포함 8~12자리</p> : null}
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleCheck}
          />
          {!checkPwd ? <p>비밀번호가 일치하지 않습니다</p> : null}
        </div>
        <VioletButton style={{ marginTop: "40px" }} onClick={onClick}>
          변경하기
        </VioletButton>
      </div>
    </div>
  );
};

export default PassWord;
