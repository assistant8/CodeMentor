import React, { useState, useRef, useEffect } from "react";

import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { api } from "../../libs/utils/api.js";
import PATH from "../../constants/path";
import {
  isEmailValid,
  isPasswordValid,
  isPassValidation,
  alertValidationMessage,
  makeEmailValidationMessage,
  makePasswordValidationMessage,
  modalValidationMessage,
} from "../../hooks/useLogin.js";
import { Modal } from "../../components/modal/index.jsx";
import { LoginHeader } from "../../components/headers/LoginHeader.jsx";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";
import { LoginTextLink } from "../../components/links/LoginTextLink.jsx";
import { useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { isLoginState } from "../../state/isLogin.js";

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

export default function Login({ setIsLogin }) {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // func
  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = async (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      modalValidationMessage(
        validationMessage,
        setModalMessage,
        openModal,
        focusRef
      );

      // alertValidationMessage(validationMessage, focusRef);

      return;
    }

    const formData = { email, password };

    try {
      const response = await api.post("/users/login", formData, {
        validateStatus: (status) => {
          return status < 500;
        },
      });
      const data = await response.data;

      if (response.status === 200) {
        alert("개발용: 로그인 성공!");

        const userInfomation = data;

        setUser(userInfomation);

        localStorage.setItem("isLogin", true);

        navigate("/");

        return;
      }

      const errorMessage = data.error;

      // "error": "User not found with the given email"
      if (response.status === 404) {
        alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

        return;
      }

      // "error": "Incorrect password"
      if (response.status === 401) {
        alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");

        return;
      }

      // alert(`개발용: 등록되지 않은 에러 메세지: ${errorMessage}`);

      // return;
    } catch (error) {
      alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

      console.log(error);

      return;
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

        api.get(`/users/profile/?email=${user.email}`).then((response) => {
          if (response.status === 200) {
            const data = response.data;

            setUser(data);

            navigate("/");

            return;
          }
        });

        const formData = {
          email: user.email,
          userName: user.displayName,
          password: "Example123",
        };

        api
          .post("/users/signup", formData, {
            validateStatus: (status) => status < 500,
          })
          .then((response) => {
            if (response.status === 201) {
              navigate(PATH.LOGIN + "/create-profile", {
                state: {
                  email: user.email,
                  userName: user.displayName,
                  password: "Example123",
                },
              });

              return;
            } else {
              alert("개발용: 구글 회원 가입 실패");

              console.log(response.status, response.data);
            }
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

  useEffect(() => {
    if (isModalOpen) return;

    if (!isModalOpen & !isEmailValid(email)) {
      focusRef.email.current.focus();

      return;
    }

    if (!isModalOpen & !isPasswordValid(password)) {
      focusRef.password.current.focus();

      return;
    }
  }, [isModalOpen]);

  return (
    <div className={styles.container_Login}>
      <Modal
        children={modalMessage}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      {/* <div className={styles.topBar}>11:11</div> */}
      <div className={styles.wrapper_header}>
        <LoginHeader children={"/*codeMentor*/"} />
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
        {/* <LoginTextLink
          children={"비밀번호 찾기"}
          onClick={handleOnClickFindPassword}
        /> */}
        <LoginTextLink children={"회원 가입"} onClick={handleOnClickSignUp} />
      </div>
      {/* <div className={styles.wrapper_loginOptions}>
        <LoginOption children={"구글"} onClick={loginByGoogle} />
        <LoginOption children={"카카오"} />
        <LoginOption children={"네이버"} />
      </div> */}
    </div>
  );
}

// const LoginOption = React.forwardRef(({ children, onClick }, ref) => {
//   return (
//     <div className={styles.loginOption} onClick={onClick} ref={ref}>
//       {children}
//     </div>
//   );
// });

function LoginOption({ children, onClick }) {
  return (
    <div className={styles.loginOption} onClick={onClick}>
      {children}
    </div>
  );
}
