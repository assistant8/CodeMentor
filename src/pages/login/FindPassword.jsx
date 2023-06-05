import styles from "./FindPassword.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PATH from "../../constants/path.js";

export default function FindPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  // let emailInputValue = "";
  const emailInputValue = useRef("");

  // 재랜더링이 필요 없어도 state를 쓰는 게 좋은가??
  // - 변수의 값은 계속해서 재할당되지만 그 변화가 화면에 출력되지 않아도 되는 상황에서는 state를 쓰지 않는 게 좋을 듯.
  // - state를 쓰면 state를 사용하는 컴포넌트가 불필요하게 재랜더링 되기 때문.
  //  - 성는에 막 엄청 큰 영향을 미칠 것 같진 않지만.
  // - 근데 나중에 state를 사용해야 할 요소가 추가될 수도 있고.. 그럴 때까지 대비해서 미리 state를 쓰자니 과한 것 같고..
  // - 뭔가를 명확하게 아는 수준이 되지 않으면 선택이 어려워져버림. 맞딱뜨릴 때마다 각각의 방법을 저울질해야 해서 스트레스.
  // - 그니까 제대로 알아두는 게 중요한 것 같음. 프로그래밍이라는 게 해결 방법을 찾는 일들의 연쇄니까. 아닐지도 모름.
  // - 일단 냅두기~

  // const [emailInputValue, setEmailInputValue] = useState("");
  const emailInput = useRef();

  const handleOnChange_emailInput = (e) => {
    // setEmailInputValue(e.target.value);
    // emailInputValue = e.target.value;
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

function isEmailValid(email) {
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const result = emailRegExp.test(email);

  return result;
}
