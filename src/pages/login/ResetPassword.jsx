import styles from "./ResetPassword.module.scss";
import { useRef } from "react";
export default function ResetPassword() {
  const passwordInput = useRef();
  return (
    <div className={styles.container}>
      <div>* 비밀번호 재설정 페이지 *</div>
      <div>비밀번호 재설정</div>
      <form>
        <label htmlFor="password">새로운 비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordInput}
          placeholder="새로운 비밀번호를 입력해주세요."
        />
        <div>비밀번호 형식 평가 메세지</div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="비밀번호를 확인해주세요."
        />
        <div>비밀번호 일치 여부 평가 메세지</div>
        <input type="submit" value="확인" />
      </form>
    </div>
  );
}
