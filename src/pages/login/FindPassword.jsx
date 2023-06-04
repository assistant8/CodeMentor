import styles from "./FindPassword.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PATH from "../../constants/path.js";
import { isEmailValid } from "../../hooks/useLogin.js";

export default function FindPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInput = useRef();
  const [emailInputValue, setEmailInputValue] = useState("");
  // const [formInputValue, setFormInputValue] = useState({ email: "" });

  // <오피스아워 질문>
  // form 안의 input 데이터를 하나의 객체에 담아 state로 만들면 관리가 용이함.
  // - 하지만 하나의 input value가 변경되어도 state로 묶인 데이터 전체가 재랜더링되니까 성능 면에서 좋지 않지 않을까?
  // - 그렇다고 input마다 따로 관리하자니,, 번거로워짐.

  const handleOnChangeEmailInput = (e) => {
    const value = e.target.value;

    setEmailInputValue(value);
    // setFormInputValue((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (emailInputValue === "") {
      alert("이메일을 입력해주세요.");

      return;
    }

    if (!isEmailValid(emailInputValue)) {
      alert("이메일 형식이 올바르지 않습니다.");

      return;
    }

    const url = "https://eonaf45qzbokh52.m.pipedream.net";
    const data = { email: emailInputValue };

    // 이 요청에서 아이디 등록 여부 확인, 인증 코드 발송을 모두 처리하는데
    // 각각을 처리하는 api가 나뉜다면 요청을 두 번 날려야 할까?
    axios
      .post(url, data)
      .then((response) => {
        // 아이디 등록 여부 확인.
        if (response.data.result === "일치하는 이메일 없음") {
          alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

          return;
        }

        // 인증 코드 발송.
        // if (response.data.result === "인증 메일 발송") {
        // 개발용 true 임시 설정
        if (true) {
          navigate(PATH.LOGIN + "/verify-email", {
            state: {
              email: emailInputValue,
              previousPageUrl: location.pathname,
            },
          });

          return;
        }
      })
      .catch((error) => {
        console.log(error);

        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
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
          name="email"
          placeholder="가입 시 사용한 이메일을 입력해주세요"
          ref={emailInput}
          onChange={handleOnChangeEmailInput}
        />{" "}
        <input
          type="submit"
          value="확인"
          onClick={handleOnClickSubmitButton}
        ></input>
      </form>
    </div>
  );
}
