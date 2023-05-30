import { useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";

export default function Login() {
  const [heading, setHeading] = useState("logo");
  const { stage } = useParams();

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
  }, []);

  return (
    <>
      <div className="container">
        <Heading heading={heading} />
        <Stage stage={stage} />
      </div>
    </>
  );
}

function Heading({ heading }) {
  const logoUrl = null;

  return <>{heading === "logo" ? <div>로고</div> : <div>{heading}</div>}</>;
}

function Stage({ stage }) {
  switch (stage) {
    case "":
      return <SelectWayToLogin />;
    case "loginByEmail":
      return <LoginByEmail />;
    case "findPassword":
      return <FindPassword />;
    case "register":
      return <Register />;
  }
}

function SelectWayToLogin() {
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
        }}
      >
        이메일로 로그인
      </div>
    </>
  );
}

function LoginByEmail() {
  return (
    <>
      <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
      <br />
      <input type="password" name="password" placeholder="******" />
      <div>로그인</div>
      <div>
        <div onClick={() => {}}>비밀번호 찾기</div>
        <div onClick={() => {}}>회원 가입</div>
      </div>
    </>
  );
}

function FindPassword() {
  return <>비밀번호 찾기</>;
}

function Register() {
  return (
    <>
      <input type="text" name="email" placeholder="codeWhisper@gmail.com" />
      <br />
      <input type="password" name="password" placeholder="******" />
      <div>로그인</div>
    </>
  );
}
