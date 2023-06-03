import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import PATH from "../../constants/path";

export default function ByEmail() {
  const navigate = useNavigate();
  const emailInput = useRef();

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  // 로그인 페이지에선 실시간 형식 검증 메세지 출력하지 않기?
  // - 페이지가 깔끔했으면 좋겠음.
  // - input 오른쪽에 체크 아이콘 같은 걸로 표시해주면 어떨까?

  // const [emailVerificationMessage, setEmailVerificationMessage] =
  //   useState("이메일을 입력해주세요.");
  // const [passwordVerificationMessage, setPasswordVerificationMessage] =
  //   useState("비밀번호를 입력해주세요");

  const emailInput_handleOnChange = (e) => {
    setEmailInputValue(e.target.value);
  };

  const passwordInput_handleOnChange = (e) => {
    setPasswordInputValue(e.target.value);
  };

  const submitButton_handleOnClick = (e) => {
    e.preventDefault();

    if (emailInputValue === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (passwordInputValue === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!isEmailValid(emailInputValue)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!isPasswordValid(passwordInputValue)) {
      alert("비밀번호 형식이 올바르지 않습니다.");

      // 비밀번호 형식 안내 메세지 살짝 보여주기?
      // - 어떤 형식이었는지 알쏭달쏭할 때 있음. 애플 비밀번호엔 대문자 두 개 넣어야 됨.

      return;
    }

    // formData 생성
    const formData = {
      email: emailInputValue,
      password: passwordInputValue,
    };

    // formData 서버로 전송(확인용 테스트 서버)
    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios
      .post(url, formData)
      .then((response) => {
        if (response.data.result === "이메일 불일치") {
          alert("등록되지 않은 이메일입니다. 이메일을 다시 확인해주세요.");

          return;
        }

        if (response.data.result === "비밀번호 불일치") {
          alert("비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인해주세요.");

          return;
        }

        // 로그인 성공 시 해야 할 일들(토큰 저장, 로그인 상태 변경 등)
        // - 쉽지 않음..

        navigate("/");
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
      <div>* 로그인 페이지 *</div>
      <div>로고</div>
      <form>
        <label>이메일</label>
        <input
          type="text"
          name="email"
          placeholder="codeWhisper@gmail.com"
          ref={emailInput}
          onChange={emailInput_handleOnChange}
        />
        {/* <div>{emailVerificationMessage}</div> */}
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={passwordInput_handleOnChange}
        />
        {/* <div>{passwordVerificationMessage}</div> */}
        <input
          type="submit"
          value="로그인"
          onClick={submitButton_handleOnClick}
        />
      </form>
      <div className={styles.wrapper_loginNav}>
        <div
          onClick={() => {
            navigate(PATH.LOGIN + "/find-password");
          }}
        >
          👀비밀번호 찾기/
        </div>
        <div
          onClick={() => {
            navigate(PATH.LOGIN + "/register");
          }}
        >
          🏓회원 가입
        </div>
      </div>
      <div className={styles.wrapper_loginOptions}>
        <div
          onClick={() => {
            console.log("구글");
          }}
        >
          🚬구글/
        </div>
        <div
          onClick={() => {
            console.log("네이버");
          }}
        >
          🥝네이버/
        </div>
        <div
          onClick={() => {
            console.log("카카오");
          }}
        >
          🍮카카오
        </div>
      </div>
    </div>
  );
}

function isEmailValid(email) {
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const result = emailRegExp.test(email);

  return result;
}

function isPasswordValid(password) {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
  const result = passwordRegExp.test(password);

  return result;
}
