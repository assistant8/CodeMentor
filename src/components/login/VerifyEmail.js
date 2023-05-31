import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <>
      <div>이메일 인증</div>
      <div>'입력한 이메일 주소'로 인증 메일이 발송되었습니다.</div>
      <input type="text" placeholder="인증 번호 6자리를 입력해주세요." />
      <div
        onClick={() => {
          console.log("인증 번호 확인 페이지");
          console.log("인증 번호 일치 검사");
          console.log("인증 번호 일치 검사 통과 시 프로필 설정 페이지로 이동");
        }}
      >
        확인
      </div>
    </>
  );
}
