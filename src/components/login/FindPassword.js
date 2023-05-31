import { useNavigate } from "react-router-dom";

export default function FindPassword() {
  const navigate = useNavigate();

  return (
    <>
      <div>비밀번호 찾기</div>
      <input
        type="text"
        placeholder="가입 시 사용한 이메일을 입력해주세요"
      />{" "}
      <div>이메일 형식 검증 메세지</div>
      <div
        onClick={() => {
          console.log("비밀번호 찾기 페이지");
          console.log("이메일 형식 검사 통과 시 버튼 활성화");
          console.log("회원 db에 등록된 이메일인지 확인");
          console.log("등록되어 있을 시 -> 비밀번호 재설정 메일 발송");
          console.log("등록되어 있지 않을 시 -> 이메일 확인 메세지 띄우기");
        }}
      >
        확인
      </div>
    </>
  );
}
