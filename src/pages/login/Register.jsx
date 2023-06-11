import styles from "./Register.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PATH from "../../constants/path";
import {
  makeEmailValidationMessage,
  makeVerificationCodeVaildationMessage,
  makePasswordValidationMessage,
  makePasswordConfirmValidationMessage,
  isPassValidation,
  alertValidationMessage,
} from "../../hooks/useLogin.js";
import { api } from "../../libs/utils/api.js";
import { InputWithIndicator } from "../../components/inputs/InputWithIndicator.jsx";
import { LoginHeader } from "../../components/headers/LoginHeader";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const verificationCodeInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const focusRef = {
    email: emailInput,
    verificationCode: verificationCodeInput,
    password: passwordInput,
    passwordConfirm: passwordConfirmInput,
  };
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    verificationCode: "",
    password: "",
    passwordConfirm: "",
  });
  const { email, verificationCode, password, passwordConfirm } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    verificationCode: "",
    password: "",
    passwordConfirm: "",
  });

  // 이메일 인증 페이지랑 합칠까..

  // const [step, setStep] = useState(0);

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnChangeVerificationCodeInput = (e) => {
    const value = e.target.value;

    const RegExp = /\D/;

    const newValue = value.replace(RegExp, "");

    setFormInputValue((prev) => ({ ...prev, [e.target.name]: newValue }));
  };

  // const handleOnChangeFormInput = (e) => {
  //   let inputName = e.target.name;
  //   let inputValue = e.target.value;

  //   if ((inputName = "verificationCode")) {
  //     const RegExp = /\D/;

  //     inputValue = inputValue.replace(RegExp, "");
  //   }

  //   setFormInputValue((prev) => ({ ...prev, [inputName]: inputValue }));
  // };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const formData = {
      email,
    };

    api.post("/회원가입", formData);

    // 비밀번호 같은 걸 navigate에 담아서 다른 컴포넌트로 막 넘겨줘도 되나..?
    navigate(PATH.LOGIN + "/verify-email", {
      state: {
        // 다음 페이지에 넘길 정보
        // - email
        //  - 이메일 인증 페이지에서 사용자 id 출력.
        //  - 이메일 인증 페이지에서 인증 중인 사용자 식별.
        //  - 이메일 인증 완료 후 서버 전송 -> db 저장(회원 가입 완료).
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
    const newMessage = makeVerificationCodeVaildationMessage(verificationCode);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      verificationCode: newMessage,
    }));
  }, [verificationCode]);

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
    <div className={styles.container_Register}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.wrapper_header}>
        <LoginHeader children={"회원 가입"} />
      </div>
      <form>
        <div className={styles.wrapper_Inputs}>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type={"text"}
              name={"email"}
              placeholder={"이메일"}
              ref={emailInput}
              onChange={handleOnChangeFormInput}
            />
            <div className={styles.validationMessage}>
              {validationMessage.email}
            </div>
          </div>

          {/* {step === 1 ? (<>인증 코드 입력 인풋</>) : null} */}
          {/* {step === 2 ? (<>비밀번호들 입력 인풋</>) : null} */}

          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type={"text"}
              name={"verificationCode"}
              placeholder={"인증 번호 6자리"}
              maxLength="6"
              ref={verificationCodeInput}
              onChange={handleOnChangeVerificationCodeInput}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              value={verificationCode}
            />
            <div className={styles.validationMessage}>
              {validationMessage.verificationCode}
            </div>
          </div>

          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type={"password"}
              name={"password"}
              placeholder={"비밀번호"}
              ref={passwordInput}
              onChange={handleOnChangeFormInput}
              maxLength={12}
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
              * 비밀번호는 영문 대문자 포함 8~12자리입니다.
            </div>
          </div>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type={"password"}
              name={"passwordConfirm"}
              placeholder={"비밀번호 확인"}
              ref={passwordConfirmInput}
              onChange={handleOnChangeFormInput}
              maxLength={12}
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

// function isVerificationCodeValid(verificationCode) {
//   return verificationCode.length === 6;
// }

// function makeVerificationCodeVaildationMessage(verificationCode) {
//   if (verificationCode === "") {
//     return "인증 번호를 입력해주세요.";
//   }

//   if (!isVerificationCodeValid(verificationCode)) {
//     return "인증 번호는 6자리 숫자입니다.";
//   }

//   return "";
// }
