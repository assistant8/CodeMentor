import styles from "./FindPassword.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PATH from "../../constants/path.js";
import isEmailValid from "./utils/isEmailValid";

export default function FindPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInputValue = useRef("");
  const emailInput = useRef();

  const handleOnChange_emailInput = (e) => {
    emailInputValue.current = e.target.value;
  };

  const handleOnClick_submitButton = (e) => {
    e.preventDefault();

    if (emailInputValue.current === "") {
      alert("이메일을 입력해주세요.");

      return;
    }

    if (!isEmailValid(emailInputValue.current)) {
      alert("이메일 형식이 올바르지 않습니다.");

      return;
    }

    // 임시 서버(데이터 전송 확인용)
    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios.post(url, { email: emailInputValue.current }).then((response) => {
      if (response.data.result === "이메일 불일치") {
        alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

        return;
      }

      navigate(PATH.LOGIN + "/verify-email", {
        state: {
          email: emailInputValue.current,
          previousPageUrl: location.pathname,
        },
      });
    });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <div>* 비밀번호 찾기 페이지 *</div>
      <div>비밀번호 찾기</div>
      <form>
        <label>이메일</label>
        <input
          type="text"
          placeholder="가입 시 사용한 이메일을 입력해주세요"
          ref={emailInput}
          onChange={handleOnChange_emailInput}
        />{" "}
        <input
          type="submit"
          value="확인"
          onClick={handleOnClick_submitButton}
        ></input>
      </form>
    </div>
  );
}
