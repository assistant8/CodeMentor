import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
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
} from "../../hooks/useLogin.js";
import { api } from "../../libs/utils/api.js";
import { InputWithEditButton } from "../../components/inputs/InputWithEditButton.jsx";
import { LoginHeader } from "../../components/headers/LoginHeader";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput";

export default function Register() {
  const navigate = useNavigate();
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
  const [step, setStep] = useState(0);

  const handleOnChangeFormInput = (e) => {
    const inputName = e.target.name;
    let inputValue = e.target.value;

    if (inputName === "verificationCode") {
      const RegExp = /\D/;

      inputValue = inputValue.replace(RegExp, "");
    }

    setFormInputValue((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  // const handleOnChangeVerificationCodeInput = (e) => {
  //   const inputName = e.target.name;
  //   const inputValue = e.target.value;

  //   const RegExp = /\D/;

  //   const newInputValue = inputValue.replace(RegExp, "");

  //   setFormInputValue((prev) => ({ ...prev, [inputName]: newInputValue }));
  // };

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
          validateStatus: (status) => {
            return (200 <= status && status < 400) || status === 404;
          },
        });

        // 404: 해당 이메일 주소를 사용하는 회원 정보가 없음.
        // -> 해당 이메일로 회원 가입을 진행.
        if (response.status === 404) {
          console.log("속행(이메일 중복 검사 통과.)");
        } else {
          alert("from: 이메일 중복 검사.");

          console.log(response.status, response.data);
        }

        // 200: 해당 이메일 주소를 사용하는 회원 정보가 있음.
        // -> return;
        if (response.status === 200) {
          console.log(result);
          alert("이미 가입된 이메일입니다.");

          return;
        }
      } catch (error) {
        alert("서버와의 통신에 실패했습니다.");

        console.log(error);

        return;
      }

      try {
        const response = await api.post(`/users/send/?email=${email}`, {
          validateStatus: (status) => {
            return 200 <= status && status < 400;
          },
        });

        // 인증 메일 발송 성공.
        if (response.status === 200) {
          setStep(1);

          return;
        }

        // 인증 메일 발송 실패.
        if (result?.error) {
          alert("인증 메일 발송 실패");

          return;
        }

        // if (result.message === "Verification email sent") {
        if (true) {
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
              return 200 <= status && status < 400;
            },
          }
        );
        const data = await response.data;

        if (data?.error) {
          const errorMessage = data.error;

          // 이건 필요 없을 것 같음. 앞에서 이메일 중복 검사를 하니까.
          // if (
          //   errorMessage === "User with the given email is already verified"
          // ) {
          //   alert("이미 인증된 사용자입니다.");

          //   return;
          // }

          if (errorMessage === "The verification code is invalid") {
            alert(
              "인증 코드가 일치하지 않습니다. 인증 코드를 다시 확인해주세요."
            );

            return;
          }

          alert(`등록되지 않은 에러 메세지: ${errorMessage}`);

          return;
        }

        // if (result.message === "email verify success!") {
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
        password,
        point: 0,
      };

      try {
        const response = await api.post(
          `/users/signup/?email=${email}`,
          formData
        );
        const result = await response.data.result;

        // 여기선 에러가 안 나오나?
        if (result?.error) {
          const errorMessage = result.error;

          alert("회원 가입에 실패했습니다.");

          return;
        }

        // if (result.message === true) {
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
  }, [password, passwordConfirm]);

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
              editButton_children={"수정"}
              editButton_showState={showEditButtonState}
              editButton_onClick={async (e) => {
                e.preventDefault();

                try {
                  const response = await api.post("/user/verify-cancle", {
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
                  onChange={handleOnChangeFormInput}
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
