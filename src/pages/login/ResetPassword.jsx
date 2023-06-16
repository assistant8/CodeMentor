import styles from "./ResetPassword.module.scss";
import { useEffect, useRef, useState } from "react";
import { api } from "../../libs/utils/api.js";
import { useNavigate, useLocation } from "react-router-dom";
import PATH from "../../constants/path";
import {
  isPassValidation,
  alertValidationMessage,
  makePasswordValidationMessage,
  makePasswordConfirmValidationMessage,
} from "../../hooks/useLogin.js";
import { LoginHeader } from "../../components/headers/LoginHeader.jsx";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";

export default function ResetPassword() {
  const location = useLocation();
  const email = location?.state?.email;
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const focusRef = {
    password: passwordInput,
    passwordConfirm: passwordConfirmInput,
  };
  const [formInputValue, setFormInputValue] = useState({
    password: "",
    passwordConfirm: "",
  });
  const { password, passwordConfirm } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = async (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const fromData = { email, password };

    try {
      const response = await api.post("/user/reset-password", fromData);
      const result = response.data.result;

      // 이게 서버에서 구현이 될까?
      if (result === "이전과 같은 비밀번호.") {
        alert("이전과 같은 비밀번호입니다. 다시 입력해주세요.");

        return;
      }

      // if (result === "비밀번호 재설정 완료") {
      if (true) {
        alert("비밀번호 재설정이 완료되었습니다. 로그인 페이지로 이동합니다.");

        navigate(PATH.LOGIN);

        return;
      }
    } catch (error) {
      alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state === null) {
      alert("잘못된 접근입니다.");
      navigate(PATH.MAIN);

      return;
    }
  }, []);

  useEffect(() => {
    passwordInput.current.focus();
  }, []);

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
    <div className={styles.container_ResetPassword}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.wrapper_header}>
        <LoginHeader children={"비밀번호 재설정"} />
      </div>

      <form>
        <div className={styles.wrapper_Inputs}>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type="password"
              name="password"
              id="password"
              ref={passwordInput}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleOnChangeFormInput}
            />
            <div className={styles.validationMessage}>
              {validationMessage.password}
            </div>
            <div
              className={styles.inputGuide}
              style={
                validationMessage.password === "완벽합니다!"
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              * 비밀번호는 영문 대문자가 하나 이상 포함된 8-12자리입니다.
            </div>
          </div>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              ref={passwordConfirmInput}
              placeholder="비밀번호를 확인해주세요."
              onChange={handleOnChangeFormInput}
            />
            <div className={styles.validationMessage}>
              {validationMessage.passwordConfirm}
            </div>
          </div>
        </div>
        <div className={styles.wrapper_submitButton}>
          <VioletButton children={"확인"} onClick={handleOnClickSubmitButton} />
        </div>
      </form>
    </div>
  );
}
