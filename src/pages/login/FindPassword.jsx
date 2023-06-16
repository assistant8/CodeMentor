import styles from "./FindPassword.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { api } from "../../libs/utils/api.js";
import PATH from "../../constants/path.js";
import {
  isEmailValid,
  isVerificationCodeValid,
  isPassValidation,
  alertValidationMessage,
  makeEmailValidationMessage,
  makeVerificationCodeVaildationMessage,
} from "../../hooks/useLogin.js";
import { InputWithEditButton } from "../../components/inputs/InputWithEditButton";
import { LoginHeader } from "../../components/headers/LoginHeader";
import { UserInput } from "../../components/inputs/UserInput";
import { VioletButton } from "../../components/buttons/VioletButton";

export default function FindPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const verificationCodeInput = useRef();
  const focusRef = {
    email: emailInput,
    verificationCode: verificationCodeInput,
  };
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    verificationCode: "",
  });
  const { email, verificationCode } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    verificationCode: "",
  });
  const [step, setStep] = useState(0);
  const [showEditButtonState, setShowEditButtonState] = useState(false);

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

      try {
        const response = await api.get(`/users/profile/?email=${email}`, {
          validateStatus: (status) => status < 500,
        });
        const data = await response.data;

        if (response.status === 200) {
          alert("개발용: 등록된 이메일.");
        } else {
          alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

          return;
        }
      } catch (error) {
        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

        console.log(error);

        return;
      }

      try {
        const response = await api.post(`/users/send/?email=${email}`, {
          validateStatus: (status) => status < 500,
        });
        const data = await response.data;

        // 인증 메일 발송 성공.
        // "message": "Verification email sent"
        if (response.status === 200) {
          alert("인증 메일 발송 성공.");
          setStep(1);

          return;
        } else {
          alert("인증 메일 발송 실패. 다시 시도해주세요.");

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

      try {
        const response = await api.post(
          `/users/verify/?email=${email}&verificationCode=${verificationCode}`,
          {
            validateStatus: (status) => {
              return status < 500 || status === 400;
            },
          }
        );
        const data = await response.data;

        console.log("데이터", data);

        // 인증 번호 일치.
        // "message": "email verify success!"
        if (response.status === 200) {
          navigate(PATH.LOGIN + "/reset-password", {
            state: { email },
          });

          return;
        }

        // 인증 번호 불일치 & 이미 인증된 사용자.
        if (response.status === 400) {
          const errorMessage = data.error;

          // "error": "The verification code is invalid"
          if (errorMessage === "The verification code is invalid") {
            alert(
              "인증 코드가 일치하지 않습니다. 인증 코드를 다시 확인해주세요."
            );

            return;
          }

          alert(
            `개발용: 등록되지 않은 에러 메세지: ${
              (response.data, errorMessage)
            }`
          );
        }

        alert(`개발용: 등록되지 않은 에러 메세지: ${response.data}`);

        return;
      } catch (error) {
        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

        console.log(error);

        return;
      }
    }
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
    const newMessage = makeVerificationCodeVaildationMessage(verificationCode);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      verificationCode: newMessage,
    }));
  }, [verificationCode]);

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
  }, [step]);

  return (
    <div className={styles.container_FindPassword}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.wrapper_header}>
        <LoginHeader children={"비밀번호 찾기"} />
      </div>
      {step == 0 ? (
        <>
          <div className={styles.message}>
            가입 시 사용한 이메일을 입력해주세요.
          </div>
        </>
      ) : null}

      <form>
        <div className={styles.wrapper_inputAndValidationMessage}>
          <InputWithEditButton
            type="text"
            name="email"
            id="emailInput"
            placeholder="이메일"
            ref={emailInput}
            onChange={handleOnChangeFormInput}
            disabled={step !== 0}
            editButton_children={"수정"}
            editButton_showState={showEditButtonState}
            editButton_onClick={async (e) => {
              e.preventDefault();

              try {
                const response = await api.post("/email-verification-cancle", {
                  email,
                });
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
          {/* <UserInput
            type="text"
            name="email"
            id="emailInput"
            placeholder="이메일"
            ref={emailInput}
            onChange={handleOnChangeFormInput}
          /> */}
          <div className={styles.validationMessage}>
            {validationMessage.email}
          </div>
        </div>
        {step === 1 ? (
          <>
            <div className={styles.wrapper_inputAndValidationMessage}>
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
        <div className={styles.wrapper_submitButton}>
          <VioletButton children={"확인"} onClick={handleOnClickSubmitButton} />
        </div>
      </form>
    </div>
  );
}
