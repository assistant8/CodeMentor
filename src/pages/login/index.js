import "./index.scss";
import { useEffect, useState } from "react";

export default function Login() {
  const [stage, setStage] = useState("selectWayToLogin");
  const [heading, setHeading] = useState("logo");

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
        <Stage stage={stage} setStage={setStage} />
      </div>
    </>
  );
}

function Heading({ heading }) {
  const logoUrl = null;

  return <>{heading === "logo" ? <div>로고</div> : <div>{heading}</div>}</>;
}

function Stage({ stage, setStage }) {
  switch (stage) {
    case "selectWayToLogin":
      return <SelectWayToLogin setStage={setStage} />;
    case "loginByEmail":
      return <LoginByEmail setStage={setStage} />;
    case "findPassword":
      return <FindPassword setStage={setStage} />;
    case "register":
      return <Register setStage={setStage} />;
  }
}

function SelectWayToLogin({ setStage }) {
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
          console.log("이메일로");
          setStage("loginByEmail");
        }}
      >
        이메일로 로그인
      </div>
    </>
  );
}

function LoginByEmail({ setStage }) {
  return (
    <>
      <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
      <br />
      <input type="password" name="password" placeholder="******" />
      <div>로그인</div>
      <div>
        <div onClick={() => setStage("findPassword")}>비밀번호 찾기</div>
        <div
          onClick={() => {
            setStage("register");
          }}
        >
          회원 가입
        </div>
      </div>
    </>
  );
}

function FindPassword() {
  return <>비밀번호 찾기</>;
}

function Register() {
  return <>회원 가입</>;
}
