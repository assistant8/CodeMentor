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
import { TextLink } from "../../components/link/TextLink.jsx";

export default function ByEmail() {
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

  const handleOnChangeInput = (e) => {
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

        // 로그인 성공 시 해야 할 일들 추가(로그인 상태 키 발급, 토큰 발급받고 저장, 유저/관리자 판별 키 발급 등)

        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
      });
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

  return (
    <div className={styles.container_Login}>
      <div className={styles.topBar}>11:11</div>
      <div className={styles.logo}>/*CodeWhisper*/</div>
      <form>
        {/* <label htmlFor="email">이메일</label> */}
        <UserInput
          // className={"input_email"}
          style={{ position: "absolute", top: "139px", left: "30.16px" }}
          type={"text"}
          name={"email"}
          placeholder={"murakami@haruki.com"}
          ref={emailInput}
          onChange={handleOnChangeInput}
        />
        {/* <input
          type="text"
          name="email"
          id="email"
          placeholder="codeWhisper@gmail.com"
          ref={emailInput}
          onChange={handleOnChangeInput}
        /> */}
        <div>{validationMessage.email}</div>
        {/* <label htmlFor="passwor">비밀번호</label> */}
        <UserInput
          // className={"input_email"}
          type={"text"}
          name={"email"}
          placeholder={"murakami@haruki.com"}
          ref={emailInput}
          onChange={handleOnChangeInput}
          style={{ position: "absolute", top: "241px", left: "30.16px" }}
        />
        {/* <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          ref={passwordInput}
          onChange={handleOnChangeInput}
        /> */}
        <div>{validationMessage.password}</div>
        <VioletButton
          children={"로그인"}
          onClick={handleOnClickSubmitButton}
          style={{ position: "absolute", top: "343px", left: "30.16px" }}
        />
        {/* <input
          type="submit"
          value="로그인"
          onClick={handleOnClickSubmitButton}
        /> */}
      </form>
      <TextLink
        styles={styles}
        className={"register"}
        children={"회원 가입"}
        onClick={() => {
          navigate(PATH.LOGIN + "/register");
        }}
      />
      {/* <div
        className={styles.register}
        onClick={() => {
          navigate(PATH.LOGIN + "/register");
        }}
      >
        회원 가입
      </div> */}
      <div
        className={styles.findPassword}
        onClick={() => {
          navigate(PATH.LOGIN + "/find-password");
        }}
      >
        비밀번호 찾기
      </div>
      <div className={styles.wrapper_loginOptions}>
        <div
          className={styles.loginOption}
          onClick={() => {
            console.log("구글");
          }}
        >
          구글
        </div>
        <div
          className={styles.loginOption}
          onClick={() => {
            console.log("네이버");
          }}
        >
          카카오
        </div>
        <div
          className={styles.loginOption}
          onClick={() => {
            console.log("카카오");
          }}
        >
          네이버
        </div>
      </div>
    </div>
  );
}
