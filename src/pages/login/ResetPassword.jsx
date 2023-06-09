import styles from "./ResetPassword.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PATH from "../../constants/path";
import {
  isPassValidation,
  alertValidationMessage,
  makePasswordValidationMessage,
  makePasswordConfirmValidationMessage,
} from "../../hooks/useLogin.js";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const location = useLocation();
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

  // const handleOnChangePasswordConfirmInput = (e) => {
  //   setFormInputValue((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const data = {
      // 사용자가 인증 링크를 클릭하고 비밀번호 재설정 페이지로 리다이렉트 된다면 사용자 email은 어떻게 가져와야 할까..?
      // - 몰라..
      password: password,
    };

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios
      .post(url, data)
      .then((response) => {
        // if (response.data.result === "비밀번호 재설정 완료") {
        // 개발용 true 임시 설정
        if (true) {
          alert(
            "비밀번호 재설정이 완료되었습니다. 로그인 페이지로 이동합니다."
          );
          navigate(PATH.LOGIN);

          return;
        }

        alert("비밀번호 재설정에 실패했습니다. 비밀번호를 다시 확인해주세요.");
      })
      .catch((error) => {
        console.log(error);
        alert("서버 문제로 비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
      });
  };

  useEffect(() => {
    if (location.state === null) {
      alert("잘못된 접근입니다.");
      navigate(PATH.MAIN);

      return;
    }

    setEmail(location.state.email);
    return;
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

    console.log(newMessage);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      passwordConfirm: newMessage,
    }));
  }, [passwordConfirm]);

  return (
    <div className={styles.container_ResetPassword}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.logo}>비밀번호 재설정</div>

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
