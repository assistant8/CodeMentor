import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <>
      <div>회원 가입</div>
      <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
      <div>이메일 형식 검증 메세지</div>
      <input type="password" name="password" placeholder="******" />
      <div>비밀번호 형식 검증 메세지</div>
      <input type="password" name="password" placeholder="******" />
      <div>비밀번호 일치 검증 메세지</div>
      <div
        onClick={() => {
          console.log("회원 가입 페이지");
          console.log(
            "이메일, 패스워드 형식, 패스워드 일치 검사 통과 시 버튼 활성화"
          );
          console.log("본인 인증 메일 발송");
          console.log("인증 번호 입력 페이지로 이동");

          navigate("/login/verify-email");
        }}
      >
        확인
      </div>
    </>
  );
}
