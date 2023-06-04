import styles from "./Register.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PATH from "../../constants/path";
import {
  isEmailValid,
  isPasswordValid,
  returnEmailVericationMessage,
  returnPasswordVericationMessage,
  returnPasswordConfirmVericationMessage,
} from "../../hooks/useLogin.js";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // const [formInputValue.email, setEmailInputValue] = useState("");
  // const [passwordInputValue, setPasswordInputValue] = useState("");
  // const [passwordConfirmInputValue, setPasswordConfirmInputValue] =
  //   useState("");
  const [verificationMessage, setVerificationMessage] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // const [emailVerificationMessage, setEmailVerificationMessage] = useState("");
  // const [passwordVerificationMessage, setPasswordVerificationMessage] =
  //   useState("");
  // const [
  //   passwordConfirmVerificationMessage,
  //   setPasswordConfirmVerificationMessage,
  // ] = useState("");

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleOnChangeF = (e) => {
  //   setPasswordInputValue(e.target.value);
  // };

  // const handleOnInput_passwordConfirmInput = (e) => {
  //   e.preventDefault();

  //   setPasswordConfirmInputValue(e.target.value);
  // };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (formInputValue.email === "") {
      alert("이메일이 입력되지 않았습니다.");

      return;
    }

    if (!isEmailValid(formInputValue.email)) {
      alert("이메일 형식이 올바르지 않습니다.");

      return;
    }

    if (formInputValue.password === "") {
      alert("비밀번호가 입력되지 않았습니다.");

      return;
    }

    if (!isPasswordValid(formInputValue.password)) {
      alert("비밀번호 형식이 올바르지 않습니다.");

      return;
    }

    if (passwordConfirmInputValue === "") {
      alert("확인 비밀번호가 입력되지 않았습니다.");

      return;
    }

    if (formInputValue.password !== passwordConfirmInputValue) {
      alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");

      return;
    }

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    const formData = {
      email: formInputValue.email,
      password: formInputValue.password,
    };

    axios(url, formData);

    console.log("본인 인증 메일 발송");
    console.log("인증 번호 입력 페이지로 이동");

    // 비밀번호 같은 걸 navigate에 담아서 다른 컴포넌트로 막 넘겨줘도 되나..?
    navigate(PATH.LOGIN + "/verify-email", {
      state: {
        email: formInputValue.email,
        previousPageUrl: location.pathname,
        password: formInputValue.password,
      },
    });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    setVerificationMessage((prev) => ({
      ...prev,
      email: returnEmailVericationMessage(formInputValue.email),
    }));
  }, [formInputValue.email]);

  useEffect(() => {
    setVerificationMessage((prev) => ({
      ...prev,
      password: returnEmailVericationMessage(formInputValue.password),
    }));
  }, [formInputValue.password]);

  useEffect(() => {
    setVerificationMessage((prev) => ({
      ...prev,
      passwordConfirm: returnEmailVericationMessage(
        formInputValue.password,
        formInputValue.passwordConfirm
      ),
    }));
  }, [formInputValue.passwordConfirm]);

  //   if (formInputValue.email === "") {
  //     setEmailVerificationMessage("이메일을 입력해주세요.");
  //   } else if (!isEmailValid(formInputValue.email)) {
  //     setEmailVerificationMessage("이메일 형식이 올바르지 않습니다.");
  //   } else {
  //     setEmailVerificationMessage("완벽합니다!");
  //   }
  // }, [formInputValue.email]);

  // useEffect(() => {
  //   if (formInputValue.password === "") {
  //     setPasswordVerificationMessage(
  //       "비밀번호는 영문 대/소문자를 최소 하나씩 포함한 8~12자리여야 합니다."
  //     );
  //   } else if (!isPasswordValid(formInputValue.password)) {
  //     setPasswordVerificationMessage("비밀번호 형식이 올바르지 않습니다.");
  //   } else {
  //     setPasswordVerificationMessage("완벽합니다!");
  //   }
  // }, [formInputValue.password]);

  // useEffect(() => {
  //   if (passwordConfirmInputValue === "") {
  //     setPasswordConfirmVerificationMessage("비밀번호를 확인해주세요.");
  //   } else if (formInputValue.password !== passwordConfirmInputValue) {
  //     setPasswordConfirmVerificationMessage("비밀번호가 일치하지 않습니다.");
  //   } else {
  //     setPasswordConfirmVerificationMessage("완벽합니다!");
  //   }
  // }, [passwordConfirmInputValue]);

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
          onInput={handleOnChangeFormInput}
        />
        <div>{verificationMessage.email}</div>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onInput={handleOnChangeFormInput}
        />
        <div>{verificationMessage.password}</div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onInput={handleOnChangeFormInput}
        />
        <div>{verificationMessage.passwordConfirm}</div>
        <input
          type="submit"
          value="확인"
          onClick={handleOnClickSubmitButton}
        ></input>
      </form>
    </div>
  );
}
