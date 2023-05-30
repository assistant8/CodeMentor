import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";

export default function Login() {
  const [heading, setHeading] = useState("logo");
  const { stage } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    switch (stage) {
      case "findPassword":
        setHeading("비밀번호 찾기");
        break;
      case "register":
        setHeading("회원 가입");
        break;
      default:
        setHeading("logo");
        break;
    }
  }, [stage]);

  return (
    <>
      <div className="container">
        <Heading heading={heading} />
        <Stage stage={stage} navigate={navigate} />
      </div>
    </>
  );
}

function Heading({ heading }) {
  const logoUrl = null;

  return <>{heading === "logo" ? <div>로고</div> : <div>{heading}</div>}</>;
}

function Stage({ stage, navigate }) {
  switch (stage) {
    case "loginByEmail":
      return <LoginByEmail navigate={navigate} />;
    case "findPassword":
      return <FindPassword />;
    case "register":
      return <Register />;
    default:
      return <SelectWayToLogin navigate={navigate} />;
  }
}

function SelectWayToLogin({ navigate }) {
  return (
    <>
      <div
        onClick={() => {
          console.log("구글");
        }}
      >
        구글 계정으로 로그인
      </div>
      <div
        onClick={() => {
          console.log("네이버");
        }}
      >
        네이버 계정으로 로그인
      </div>
      <div
        onClick={() => {
          console.log("카카오");
        }}
      >
        카카오 계정으로 로그인
      </div>

      <div
        onClick={() => {
          navigate("/login/loginByEmail");
        }}
      >
        이메일로 로그인
      </div>
    </>
  );
}

function LoginByEmail({ navigate }) {
  return (
    <>
      <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
      <div>이메일 형식 검증 메세지</div>
      <input type="password" name="password" placeholder="******" />
      <div>비밀번호 형식 검증 메세지</div>
      <div>로그인</div>
      <div>
        <div
          onClick={() => {
            navigate("/login/findPassword");
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

function FindPassword() {
  return (
    <>
      <input type="text" placeholder="가입 시 사용한 이메일을 입력해주세요" />{" "}
      <div>이메일 형식 검증 메세지</div>
      <div
        onClick={() => {
          console.log("비밀번호 찾기 페이지");
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

function Register() {
  return (
    <>
      <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
      <br />
      <input type="password" name="password" placeholder="******" />
      <div onClick={() => console.log("회원 가입 페이지")}>확인</div>
    </>
  );
}
