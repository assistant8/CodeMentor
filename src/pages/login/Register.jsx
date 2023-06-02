import styles from "./Register.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PATH from "../../constants/path";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
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
    e.preventDefault();

    setPasswordConfirmInputValue(e.target.value);
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    if (emailInputValue === "") {
      setEmailVerificationMessage("이메일을 입력해주세요.");
    } else if (!isEmailValid(emailInputValue)) {
      setEmailVerificationMessage("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailVerificationMessage("완벽합니다!");
    }
  }, [emailInputValue]);

  useEffect(() => {
    if (passwordInputValue === "") {
      setPasswordVerificationMessage(
        "비밀번호는 영문 대/소문자를 최소 하나씩 포함한 8~12자리여야 합니다."
      );
    } else if (!isPasswordValid(passwordInputValue)) {
      setPasswordVerificationMessage("비밀번호 형식이 올바르지 않습니다.");
    } else {
      setPasswordVerificationMessage("완벽합니다!");
    }
  }, [passwordInputValue]);

  useEffect(() => {
    if (passwordConfirmInputValue === "") {
      setPasswordConfirmVerificationMessage("비밀번호를 확인해주세요.");
    } else if (passwordInputValue !== passwordConfirmInputValue) {
      setPasswordConfirmVerificationMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmVerificationMessage("완벽합니다!");
    }
  }, [passwordConfirmInputValue]);

  return (
    <div className={styles.container}>
      <div>* 회원 가입 페이지 *</div>
      <div>회원 가입</div>
      <form>
        <label>이메일</label>
        <input
          type="text"
          name="email"
          placeholder="codeWhisper@gmail.com"
          ref={emailInput}
          onInput={handleOnInput_emailInput}
        />
        <div>{emailVerificationMessage}</div>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onInput={handleOnInput_passwordInput}
        />
        <div>{passwordVerificationMessage}</div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onInput={handleOnInput_passwordConfirmInput}
        />
        <div>{passwordConfirmVerificationMessage}</div>
        <input
          type="submit"
          value="확인"
          onClick={() => {
            console.log("회원 가입 페이지");
            console.log(
              "이메일, 패스워드 형식, 패스워드 일치 검사 통과 시 버튼 활성화"
            );
            console.log("본인 인증 메일 발송");
            console.log("인증 번호 입력 페이지로 이동");

            navigate(PATH.LOGIN + "/verify-email", {
              state: {
                email: emailInputValue,
                previousPageUrl: location.pathname,
              },
            });
          }}
        ></input>
      </form>
    </div>
  );
}

function isEmailValid(email) {
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const result = emailRegExp.test(email);

  return result;
}

function isPasswordValid(password) {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
  const result = passwordRegExp.test(password);

  return result;
}
