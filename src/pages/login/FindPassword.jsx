import styles from "./FindPassword.module.scss";
import { useNavigate } from "react-router-dom";

export default function FindPassword() {
  const navigate = useNavigate();

  const handleOnClick_emailInput = (e) => {
    e.preventDefault();
    navigate("/find-password/verify-email", {
      state: { email: e.target.value },
    });
  };
  return (
    <div className={styles.container}>
      <div>* 비밀번호 찾기 페이지 *</div>
      <div>비밀번호 찾기</div>
      <form>
        <label>이메일</label>
        <input
          type="text"
          placeholder="가입 시 사용한 이메일을 입력해주세요"
        />{" "}
        <input
          type="submit"
          value="확인"
          onClick={handleOnClick_emailInput}
        ></input>
      </form>
    </div>
  );
}
