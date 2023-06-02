import styles from "./Login.module.scss";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>* 로그인 방식 선택 페이지 *</div>
      <div>로고</div>
      <form>
        <input type="text" placeholder="이메일" />
        <input type="password" placeholder="********" />
        <input type="submit" value="로그인" />
      </form>

      <div
        onClick={() => {
          navigate("/login/by-email");
        }}
      >
        이메일로 로그인
      </div>
    </div>
  );
}
