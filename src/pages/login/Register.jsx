import styles from "./Register.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PATH from "../../constants/path";
import {
  isEmailValid,
  isVerificationCodeValid,
  isPasswordValid,
  isPasswordConfirmValid,
  makeEmailValidationMessage,
  makeVerificationCodeVaildationMessage,
  makePasswordValidationMessage,
  makePasswordConfirmValidationMessage,
  isPassValidation,
  alertValidationMessage,
} from "../../hooks/useLogin.js";
import { api } from "../../libs/utils/api.js";
import { InputWithEditButton } from "../../components/inputs/InputWithEditButton.jsx";
import { InputWithIndicator } from "../../components/inputs/InputWithIndicator.jsx";
import { LoginHeader } from "../../components/headers/LoginHeader";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput";
import { set } from "date-fns";

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
  const [showEditButtonState, setShowEditButtonState] = useState(false);

  // 이메일 인증 페이지랑 합칠까..

  const [step, setStep] = useState(0);

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnChangeVerificationCodeInput = (e) => {
    const value = e.target.value;

    const RegExp = /\D/;

    const newValue = value.replace(RegExp, "");

    setFormInputValue((prev) => ({ ...prev, [e.target.name]: newValue }));
  };

  const handleOnClickSubmitButton = async (e) => {
    e.preventDefault();

    if (step === 0) {
      if (!isEmailValid(email)) {
        alert(validationMessage.email);

        focusRef.email.current.focus();

        return;
      }

      const formData = {
        email,
      };

      try {
        const response = await api.post("/email-verification", formData);
        const result = response.data.result;

        if (result === "이미 가입된 이메일.") {
          alert("이미 가입된 이메일입니다.");

          return;
        }

        // if (result === "인증 메일 발송 성공.") {
        if (true) {
          setStep(1);

          return;
        }
      } catch (error) {
        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

        console.log(error);

        return;
      }
    }

    if (step === 1) {
      if (!isVerificationCodeValid(verificationCode)) {
        alert(validationMessage.verificationCode);

        focusRef.verificationCode.current.focus();

        return;
      }

      const formData = {
        email,
        verificationCode,
      };

      try {
        const response = await api.post("/verification-code-confirm", formData);
        const result = await response.data.result;

        if (result === "인증 코드가 일치하지 않습니다.") {
          alert(
            "인증 코드가 일치하지 않습니다. 인증 코드를 다시 확인해주세요."
          );

          return;
        }
        // if (result === "인증 코드가 일치합니다.") {
        if (true) {
          setStep(2);

          return;
        }
      } catch (error) {
        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

        console.log(error);

        return;
      }
    }

    if (step === 2) {
      if (!isPasswordValid(password)) {
        alert(validationMessage.password);

        focusRef.password.current.focus();

        return;
      }

      if (!isPasswordConfirmValid(password, passwordConfirm)) {
        alert(validationMessage.passwordConfirm);

        focusRef.passwordConfirm.current.focus();

        return;
      }

      const formData = {
        email,
        password,
        userName: "",
        image: "",
        grade: "",
        point: "",
      };

      try {
        const response = await api.post("/user/sign-up", formData);
        const result = await response.data.result;

        // if (result === "회원 가입 완료") {
        if (true) {
          alert("회원 가입이 완료되었습니다. 프로필 설정 페이지로 이동합니다.");

          navigate(PATH.LOGIN + "/create-profile", {
            state: {
              email,
            },
          });
        }
      } catch (error) {
        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

        console.log(error);
      }
    }
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

  useEffect(() => {
    if (step === 0) {
      focusRef.email.current.focus();

      setFormInputValue((prev) => ({
        ...prev,
        verificationCode: "",
        password: "",
        passwordConfirm: "",
      }));

      setShowEditButtonState(false);

      return;
    }
    if (step === 1) {
      focusRef.verificationCode.current.focus();

      setShowEditButtonState(true);

      return;
    }

    if (step === 2) {
      focusRef.password.current.focus();

      setShowEditButtonState(true);

      return;
    }
  }, [step]);

  return (
    <div className={styles.container_Register}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.wrapper_header}>
        <LoginHeader children={"회원 가입"} />
      </div>
      <form>
        <div className={styles.wrapper_Inputs}>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <InputWithEditButton
              type={"text"}
              name={"email"}
              placeholder={"이메일"}
              ref={emailInput}
              onChange={handleOnChangeFormInput}
              disabled={step !== 0}
              showEditButtonState={showEditButtonState}
              buttonOnClick={async (e) => {
                e.preventDefault();

                try {
                  const response = await api.post(
                    "/email-verification-cancle",
                    {
                      email,
                    }
                  );
                  const result = await response.data.result;

                  // if (response.data.result === "발송된 인증 번호 폐기 성공.") {
                  if (true) {
                    setStep(0);

                    return;
                  }
                } catch (error) {
                  alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

                  console.log(error);

                  return;
                }
              }}
            />
            <div className={styles.validationMessage}>
              {validationMessage.email}
            </div>
          </div>
          {step === 1 ? (
            <>
              <div className={styles.wrapper_InputAndValidationMessage}>
                <div className={styles.message}>
                  {email}로 인증 번호가 발송되었습니다.
                </div>
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
            </>
          ) : null}

          {step === 2 ? (
            <>
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
            </>
          ) : null}
        </div>
        <div className={styles.wrapper_submitButton}>
          <VioletButton children={"확인"} onClick={handleOnClickSubmitButton} />
        </div>
      </form>
    </div>
  );
}
