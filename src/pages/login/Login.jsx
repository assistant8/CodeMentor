import React, { useState, useRef, useEffect } from "react";

import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { api } from "../../libs/utils/api.js";
import PATH from "../../constants/path";
import {
  isPassValidation,
  alertValidationMessage,
  makeEmailValidationMessage,
  makePasswordValidationMessage,
} from "../../hooks/useLogin.js";
import { LoginHeader } from "../../components/headers/LoginHeader.jsx";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";
import { LoginTextLink } from "../../components/links/LoginTextLink.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../state/userState";
import kakao from "../../image/kakao.png";
import naver from "../../image/naver.png";
// 구글 소셜 로그인
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDyOOsomlJCW3xSpNKNotjdSsaJM6mfNu0",
  authDomain: "codewhisper.firebaseapp.com",
  projectId: "codewhisper",
  storageBucket: "codewhisper.appspot.com",
  messagingSenderId: "22796198126",
  appId: "1:22796198126:web:b38749a74faf3fbf66d3ff",
  measurementId: "G-E633BRZQBL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function Login() {
  // hook
  const navigate = useNavigate();

  // focusing
  const emailInput = useRef();
  const passwordInput = useRef();
  const focusRef = { email: emailInput, password: passwordInput };

  // state
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
  });
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useRecoilState(userState);

  // state destructuring
  const { email, password } = formInputValue;

  // func
  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = async (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const formData = { ...formInputValue };

    try {
      const response = await api.post("/user/login", formData);
      const result = await response.data.result;

      if (result === "db에 이메일 없음.") {
        alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

        return;
      }

      if (result === "비밀번호가 틀림.") {
        alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");

        return;
      }

      const userInfo = {
        email,
        password,
        userName: "낭니",
        image: "account-circle.png",
        grade: "고수",
        point: 100,
      };

      setUser((prev) => ({ ...prev, ...userInfo }));

      console.log(user);

      navigate("/");
    } catch (error) {
      alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

      console.log(error);
    }
  };

  const handleOnClickFindPassword = () => {
    navigate(PATH.LOGIN + "/find-password");
  };

  const handleOnClickSignUp = () => {
    navigate(PATH.LOGIN + "/register");
  };

  const loginByGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)

        if (user.emailVerified === false) {
          alert("구글 인증에 실패했습니다. 다시 시도해주세요.");

          return;
        }

        const formData = { email: user.email };

        // 가입 내역 있음?
        // - 있음
        //  -> (백) 로그인 처리.
        //  -> (프론트) 메인 페이지로 이동.
        // - 없음
        //  -> (백) 가입 처리.
        //  -> (프론트) 프로필 생성 페이지로 이동.
        api
          .post("/user/login-google", formData)
          .then((response) => {
            const result = response.data.result;

            // if (result === "db에 이메일 없음.") {
            if (true) {
              navigate(PATH.LOGIN + "/create-profile", {
                state: { email: user.email, name: user.displayName },
              });

              return;
            }

            navigate("/");

            return;
          })
          .catch((error) => {
            alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

            console.log(error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("error: ", error);
      });
  };

  const loginByKaKao = () => {
    return;
  };
  const loginByNaver = () => {
    return;
  };

  useEffect(() => {
    // 로그인 된 상태?
    // ㅇㅇ -> 메인 페이지로 이동.
    // ㄴㄴ -> 페이지 랜더링 계속.
  }, []);

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    setValidationMessage((prev) => ({
      ...prev,
      email: makeEmailValidationMessage(email),
    }));
  }, [email]);

  useEffect(() => {
    setValidationMessage((prev) => ({
      ...prev,
      password: makePasswordValidationMessage(password),
    }));
  }, [password]);

  return (
    <div className={styles.container_Login}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.wrapper_header}>
        <LoginHeader children={"logo"} />
      </div>
      <form>
        <div className={styles.wrapper_Inputs}>
          <UserInput
            type={"text"}
            name={"email"}
            placeholder={"이메일"}
            ref={emailInput}
            onChange={handleOnChangeFormInput}
          />
          <UserInput
            type={"password"}
            name={"password"}
            placeholder={"비밀번호"}
            ref={passwordInput}
            onChange={handleOnChangeFormInput}
          />
        </div>
        <div className={styles.wrapper_submitButton}>
          <VioletButton
            children={"로그인"}
            onClick={handleOnClickSubmitButton}
          />
        </div>
      </form>
      <div className={styles.wrapper_TextLinks}>
        <LoginTextLink
          children={"비밀번호 찾기"}
          onClick={handleOnClickFindPassword}
        />
        <LoginTextLink children={"회원 가입"} onClick={handleOnClickSignUp} />
      </div>
      <div className={styles.wrapper_loginOptions}>
        <LoginOption children={"구글"} onClick={loginByGoogle} />
        <LoginOption children={"카카오"} />
        <LoginOption children={"네이버"} />
      </div>
    </div>
  );
}

const LoginOption = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div className={styles.loginOption} onClick={onClick} ref={ref}>
      {children}
    </div>
  );
});
