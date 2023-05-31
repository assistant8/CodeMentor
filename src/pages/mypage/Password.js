import styles from "./Password.module.scss";
import { VioletButton } from "../../components/buttons/VioletButton";

const PassWord = () => {
  return (
    <div className={styles.pwdContainer}>
      <p className={styles.pwdTitle}>비밀번호 변경</p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputBox}>
          <input placeholder="현재 비밀번호" />
        </div>
        <div className={styles.inputBox}>
          <input placeholder="비밀번호" />
          <p>영문 대소문자 포함 8~12자리</p>
        </div>
        <div className={styles.inputBox}>
          <input placeholder="비밀번호 확인" />
          <p>비밀번호가 일치하지 않습니다</p>
        </div>
        <VioletButton style={{ marginTop: "40px" }}>변경하기</VioletButton>
      </div>
    </div>
  );
};

export default PassWord;
