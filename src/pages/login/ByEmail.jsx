import styles from "./ByEmail.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ByEmail() {
  const navigate = useNavigate();
  const emailInput = useRef();

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  // const [emailVerificationMessage, setEmailVerificationMessage] =
  //   useState("이메일을 입력해주세요.");
  // const [passwordVerificationMessage, setPasswordVerificationMessage] =
  //   useState("비밀번호를 입력해주세요");

  const emailInput_handleOnInput = (e) => {
    setEmailInputValue(e.target.value);
  };

  const passwordInput_handleOnInput = (e) => {
    setPasswordInputValue(e.target.value);
  };

  console.log(emailInputValue, passwordInputValue);
  const submitButton_handleOnClick = (e) => {
    e.preventDefault();

    // formData 생성
    const formData = {
      email: emailInputValue,
      password: passwordInputValue,
    };

    // formData를 서버로 전송(테스트 서버)
    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios
      .post(url, formData)
      .then((response) => {
        // resoponse에 따라 로그인을 완료시키거나 아이디/비밀번호 재확인 메세지 출력.
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  // useEffect(() => {
  //   if (emailInputValue === "") {
  //     setEmailVerificationMessage("이메일을 입력해주세요.");
  //   } else if (!isEmailCorrect(emailInputValue)) {
  //     setEmailVerificationMessage("이메일 형식이 올바르지 않습니다.");
  //   } else {
  //     setEmailVerificationMessage("완벽합니다!");
  //   }
  // }, [emailInputValue]);

  // useEffect(() => {
  //   if (passwordInputValue === "") {
  //     setPasswordVerificationMessage("비밀번호를 입력해주세요.");
  //   } else if (!isPasswordCorrect(passwordInputValue)) {
  //     setPasswordVerificationMessage("비밀번호 형식이 올바르지 않습니다.");
  //   } else {
  //     setPasswordVerificationMessage("완벽합니다!");
  //   }
  // }, [passwordInputValue]);

  return (
    <div className={styles.container}>
      <div>* 이메일 로그인 페이지 *</div>
      <div>로고</div>
      <form>
        <label>이메일</label>
        <br />
        <input
          type="text"
          name="email"
          placeholder="codeWhisper@gmail.com"
          ref={emailInput}
          onInput={emailInput_handleOnInput}
        />
        {/* <div>{emailVerificationMessage}</div> */}
        <br />
        <label>비밀번호</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="******"
          onInput={passwordInput_handleOnInput}
        />
        {/* <div>{passwordVerificationMessage}</div> */}
        <br />
        <input
          type="submit"
          value="로그인"
          onClick={submitButton_handleOnClick}
        />
      </form>
      <div>
        <div
          onClick={() => {
            navigate("/login/find-password");
          }}
        >
          비밀번호 찾기
        </div>
        <div
          onClick={() => {
            navigate("/login/register");
          }}
        >
          회원 가입
        </div>
      </div>
    </div>
  );
}

// function isEmailValid(email) {
//   const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//   const result = emailRegExp.test(email);

//   return result;
// }

// function isPasswordValid(password) {
//   const passwordRegExp = /^[A-Za-z0-9]{8,}$/;
//   const result = passwordRegExp.test(password);

//   return result;
// }
