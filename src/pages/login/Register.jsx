import styles from "./Register.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PATH from "../../constants/path";
import {
  makeEmailValidationMessage,
  makePasswordValidationMessage,
  makePasswordConfirmValidationMessage,
  isPassValidation,
  alertValidationMessage,
  axiosInterceptors,
} from "../../hooks/useLogin.js";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const focusRef = {
    email: emailInput,
    password: passwordInput,
    passwordConfirm: passwordConfirmInput,
  };
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { email, password, passwordConfirm } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  axiosInterceptors();

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    const formData = {
      email,
      password,
    };

    axios(url, formData);

    // 비밀번호 같은 걸 navigate에 담아서 다른 컴포넌트로 막 넘겨줘도 되나..?
    navigate(PATH.LOGIN + "/verify-email", {
      state: {
        // 다음 페이지에 넘길 정보
        // - email
        //  - 이메일 인증 페이지에서 사용자 id 출력.
        //  - 이메일 인증 페이지에서 인증 중인 사용자 식별.
        //  - 이메일 인증 완료 후 회원 이메일 서버 전송.
        // - password
        //  - 이메일 인증 완료 후 회원 비밀번호 서버 전송.
        //  - ???) 보안이 필요한 정보를 컴포넌트 간에 막 넘겨줘도 되는지 모르겠음.
        // - previousPageUr
        //  - 이메일 인증 완료 후 이전 페이지를 기반으로 다음 페이지 결정.
        email,
        password,
        previousPageUrl: location.pathname,
      },
    });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    const newMessage = makeEmailValidationMessage(email);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      email: newMessage,
    }));
  }, [email]);

  useEffect(() => {
    const newMessage = makePasswordValidationMessage(password);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      password: newMessage,
    }));
  }, [password]);

  useEffect(() => {
    const newMessage = makePasswordConfirmValidationMessage(
      password,
      passwordConfirm
    );

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      passwordConfirm: newMessage,
    }));
  }, [passwordConfirm]);

  return (
    <>
      <div>* 회원 가입 페이지 *</div>
      <div>회원 가입</div>
      <form>
        <label htmlFor="emailInput">이메일</label>
        <input
          type="text"
          name="email"
          id="emailInput"
          placeholder="codeWhisper@gmail.com"
          ref={emailInput}
          onChange={handleOnChangeFormInput}
        />
        <div>{validationMessage.email}</div>
        <label htmlFor="passwordInput">비밀번호</label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          maxLength="12"
          placeholder="********"
          ref={passwordInput}
          onChange={handleOnChangeFormInput}
        />
        <div>{validationMessage.password}</div>
        <label htmlFor="passwordConfirmInput">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirmInput"
          maxLength="12"
          placeholder="********"
          ref={passwordConfirmInput}
          onChange={handleOnChangeFormInput}
        />
        <div>{validationMessage.passwordConfirm}</div>
        <input
          type="submit"
          value="확인"
          onClick={handleOnClickSubmitButton}
        ></input>
      </form>
    </>
  );
}
