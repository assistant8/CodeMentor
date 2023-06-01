import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const emailInput = useRef();
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [passwordConfirmInputValue, setPasswordConfirmInputValue] =
    useState("");
  const [emailVerificationMessage, setEmailVerificationMessage] = useState("");
  const [passwordVerificationMessage, setPasswordVerificationMessage] =
    useState("");
  const [
    passwordConfirmVerificationMessage,
    setPasswordConfirmVerificationMessage,
  ] = useState("");

  const handleOnInput_emailInput = (e) => {
    setEmailInputValue(e.target.value);
  };

  const handleOnInput_passwordInput = (e) => {
    setPasswordInputValue(e.target.value);
  };

  const handleOnInput_passwordConfirmInput = (e) => {
    setPasswordConfirmInputValue(e.target.value);
  };

  console.log(emailInputValue, passwordInputValue, passwordConfirmInputValue);

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    if (emailInputValue === "") {
      console.log("이메일 형식이 올바릅니다.");
    }
  }, [emailInputValue]);

  return (
    <>
      <div>* 회원 가입 페이지 *</div>
      <div>회원 가입</div>
      <label>이메일</label>
      <input
        type="text"
        name="email"
        placeholder="codeWhisper@gmail.com"
        ref={emailInput}
        onInput={handleOnInput_emailInput}
      />
      <label>비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="******"
        onInput={handleOnInput_passwordInput}
      />
      <label>비밀번호 확인</label>
      <input
        type="password"
        name="password"
        placeholder="******"
        onInput={handleOnInput_passwordConfirmInput}
      />
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

function isEmailValid(email) {
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const result = emailRegExp.test(email);

  return result;
}

function isPasswordValid(password) {
  const passwordRegExp = /^[A-Za-z0-9]{8,}$/;
  const result = passwordRegExp.test(password);

  return result;
}
