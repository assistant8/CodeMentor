import { useNavigate } from "react-router-dom";

export default function ByEmail() {
  const navigate = useNavigate();

  // let regex = new RegExp(
  //   "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  // );

  return (
    <>
      <div>* 이메일 로그인 페이지 *</div>
      <div>로고</div>
      <form action="">
        <label>이메일</label>
        <br />
        <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
        <br />
        <label>비밀번호</label>
        <br />
        <input type="password" name="password" placeholder="******" />

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
