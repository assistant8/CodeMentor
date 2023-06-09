import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import PATH from "../../constants/path";
import {
  isPassValidation,
  alertValidationMessage,
  makeEmailValidationMessage,
  makePasswordValidationMessage,
} from "../../hooks/useLogin.js";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";
import { LoginTextLink } from "../../components/links/LoginTextLink.jsx";
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
  const navigate = useNavigate();
  const emailInput = useRef();
  const passwordInput = useRef();
  const focusRef = { email: emailInput, password: passwordInput };
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({
    email: "",
    password: "",
  });

  // 로그인 페이지에선 실시간 형식 검증 메세지 출력하지 않기?
  // - 페이지가 깔끔했으면 좋겠음.
  // - input 오른쪽에 체크 아이콘 같은 걸로 표시해주면 어떨까?

  const handleOnChangeFormInput = (e) => {
    setFormInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isPassValidation(formInputValue)) {
      alertValidationMessage(validationMessage, focusRef);

      return;
    }

    // formData 서버로 전송(확인용 테스트 서버)
    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    const formData = { ...formInputValue };

    axios
      .post(url, formData)
      .then((response) => {
        if (response.data.result === "이메일이 db에 등록되어 있지 않음.") {
          alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

          return;
        }

        if (response.data.result === "db에 이메일은 있는데 비밀번호가 틀림.") {
          alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");

          return;
        }

        // 로그인 성공 시

        // const token = response.data.token;
        const authToken = "123";

        localStorage.setItem("authToken", authToken);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
      });
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

        console.log(
          "result: ",
          result,
          "\n",
          "token: ",
          token,
          "\n",
          "user: ",
          user.displayName,
          user.email,
          user.emailVerified
        );

        navigate("/login/create-profile", {
          state: { email: user.email, name: user.displayName },
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
    const isAuthToken = localStorage.getItem("authToken");

    if (isAuthToken) {
      navigate("/");

      return;
    }
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
      <div className={styles.logo}>/*CodeWhisper*/</div>
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
          onClick={() => {
            navigate(PATH.LOGIN + "/find-password");
          }}
        />
        <LoginTextLink
          children={"회원 가입"}
          onClick={() => {
            navigate(PATH.LOGIN + "/register");
          }}
        />
      </div>
      <div className={styles.wrapper_loginOptions}>
        <div
          className={styles.loginOption}
          style={{
            border: "1px solid",
          }}
          onClick={loginByGoogle}
        >
          구글
        </div>

        <LoginOption optionName={kakao} />
        <LoginOption optionName={naver} />
      </div>
    </div>
  );
}

function LoginOption({ optionName }) {
  return (
    <div className={styles.loginOption}>
      <img src={optionName} alt="" />
    </div>
  );
}
