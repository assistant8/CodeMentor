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
} from "../../hooks/useLogin.js";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const ref = {
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

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, ref);

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

    setValidationMessage((prev) => ({
      ...prev,
      email: newMessage,
    }));
  }, [email]);

  useEffect(() => {
    const newMessage = makePasswordValidationMessage(password);

    setValidationMessage((prev) => ({
      ...prev,
      password: newMessage,
    }));
  }, [password]);

  useEffect(() => {
    const newMessage = makePasswordConfirmValidationMessage(
      password,
      passwordConfirm
    );

    setValidationMessage((prev) => ({
      ...prev,
      passwordConfirm: newMessage,
    }));
  }, [passwordConfirm]);

  return (
    <div className={styles.container}>
      <div>* 회원 가입 페이지 *</div>
      <div>회원 가입</div>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="codeWhisper@gmail.com"
          ref={emailInput}
          onChange={handleOnChangeFormInput}
        />
        <div>{validationMessage.email}</div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          maxLength="12"
          placeholder="********"
          ref={passwordInput}
          onChange={handleOnChangeFormInput}
        />
        <div>{validationMessage.password}</div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
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
    </div>
  );
}
