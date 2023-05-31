import { useNavigate } from "react-router-dom";

export default function ByEmail() {
  const navigate = useNavigate();

  return (
    <>
      <div>로고</div>
      <form action="">
        <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
        <div>이메일 형식 검증 메세지</div>
        <input type="password" name="password" placeholder="******" />
        <div>비밀번호 형식 검증 메세지</div>
        <div>로그인</div>
      </form>
      <div>
        <div
          onClick={() => {
            navigate("/login/find-password");
          }}
        >
          비밀번호 찾기
        </div>
        <div
          onClick={() => {
            navigate("/login/register");
          }}
        >
          회원 가입
        </div>
      </div>
    </>
  );
}
