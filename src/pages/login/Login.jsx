import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import PATH from "../../constants/path";
import { isEmailValid, isPasswordValid } from "./utils/utils";

export default function ByEmail() {
  const navigate = useNavigate();
  const emailInput = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [verificationMessage, setVerificationMessage] = useState({
    email: "",
    password: "",
  });

  // 로그인 페이지에선 실시간 형식 검증 메세지 출력하지 않기?
  // - 페이지가 깔끔했으면 좋겠음.
  // - input 오른쪽에 체크 아이콘 같은 걸로 표시해주면 어떨까?

  const handleOnChangeInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (formData.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (formData.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!isEmailValid(formData.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      alert("비밀번호 형식이 올바르지 않습니다.");

      // 비밀번호 형식 안내 메세지 살짝 보여주기?
      // - 어떤 형식이었는지 알쏭달쏭할 때 있음. 애플 비밀번호엔 대문자 두 개 넣어야 됨.

      return;
    }

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

        // 로그인 성공 시 해야 할 일들 추가(로그인 상태 키 발급, 토큰 발급받고 저장, 유저/관리자 판별 키 발급 등)

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    if (formData.email === "") {
      setVerificationMessage((prev) => ({
        ...prev,
        email: "",
      }));

      return;
    }

    if (!isEmailValid(formData.email)) {
      setVerificationMessage((prev) => ({
        ...prev,
        email: "이메일 형식이 올바르지 않습니다.",
      }));

      return;
    }

    setVerificationMessage((prev) => ({
      ...prev,
      email: "완벽합니다!",
    }));
  }, [formData.email]);

  useEffect(() => {}, [formData.password]);

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
          onChange={handleOnChangeInput}
        />
        <div>{verificationMessage.email}</div>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={handleOnChangeInput}
        />
        <div>{verificationMessage.password}</div>
        <input
          type="submit"
          value="로그인"
          onClick={handleOnClickSubmitButton}
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
