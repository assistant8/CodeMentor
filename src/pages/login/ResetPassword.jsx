import styles from "./ResetPassword.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PATH from "../../constants/path";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const passwordInput = useRef();
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [passwordConfirmInputValue, setPasswordConfirmInputValue] =
    useState("");

  const [passwordVerificationMessage, setPasswordVerificationMessage] =
    useState("");
  const [
    passwordConfirmVerificationMessage,
    setPasswordConfirmVerificationMessage,
  ] = useState("");
  const navigate = useNavigate();

  const handleOnChange_passwordInput = (e) => {
    setPasswordInputValue(e.target.value);
  };

  const handleOnChange_passwordConfirmInput = (e) => {
    setPasswordConfirmInputValue(e.target.value);
  };

  const handleOnClick_submitButton = (e) => {
    e.preventDefault();

    if (!isPasswordValid(passwordInputValue)) {
      alert("비밀번호 형식이 올바르지 않습니다.");

      return;
    }

    if (passwordInputValue !== passwordConfirmInputValue) {
      alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");

      return;
    }

    const data = {
      // 사용자가 인증 링크를 클릭하고 비밀번호 재설정 페이지로 리다이렉트 된다면 사용자 email은 어떻게 가져와야 할까..?
      // - 몰라..
      password: passwordInputValue,
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
    if (passwordInputValue === "") {
      setPasswordVerificationMessage(
        "비밀번호는 영문 대/소문자를 최소 하나씩 포함한 8~12자리여야 합니다."
      );
    } else if (!isPasswordValid(passwordInputValue)) {
      setPasswordVerificationMessage("비밀번호 형식이 올바르지 않습니다.");
    } else {
      setPasswordVerificationMessage("완벽합니다!");
    }
  }, [passwordInputValue]);

  useEffect(() => {
    if (passwordConfirmInputValue === "") {
      setPasswordConfirmVerificationMessage("비밀번호를 확인해주세요.");
    } else if (passwordInputValue !== passwordConfirmInputValue) {
      setPasswordConfirmVerificationMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmVerificationMessage("완벽합니다!");
    }
  }, [passwordConfirmInputValue]);

  return (
    <div className={styles.container}>
      <div>* 비밀번호 재설정 페이지 *</div>
      <div>비밀번호 재설정</div>
      <form>
        <label htmlFor="password">새로운 비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordInput}
          placeholder="새로운 비밀번호를 입력해주세요."
          onChange={handleOnChange_passwordInput}
        />
        <div>{passwordVerificationMessage}</div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="비밀번호를 확인해주세요."
          onChange={handleOnChange_passwordConfirmInput}
        />
        <div>{passwordConfirmVerificationMessage}</div>
        <input
          type="submit"
          value="확인"
          onClick={handleOnClick_submitButton}
        />
      </form>
    </div>
  );
}

function isPasswordValid(password) {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
  const result = passwordRegExp.test(password);

  return result;
}
