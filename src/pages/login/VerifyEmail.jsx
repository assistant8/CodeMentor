import styles from "./VerifyEmail.module.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PATH from "../../constants/path";
import { set } from "immutable";

// 클릭 버튼을 없애는 게 사용자한테 더 편하려나.
// - verification code랑 input 내용 평가해서 자동으로 다음 페이지로 넘어가게.
// - 클릭 절차를 없앤다면 alert 말고 input 밑에 평가 메세지를 살짝 띄워주면 될 듯.
// - verification code는 어차피 이 페이지에서 갖고 있을 거니까.
// - 이전 페이지에서 갖고 있으려나..? 그러면.. 굳이 그걸 이 페이지로 넘겨서 다음 절차를 진행할 필요가 있나..?
// - 아니 애초에 인증 코드를 프론트에서 갖고 있는 게 맞나? input 서버로 넘겨서 서버에서 검증을 해줘야 하나..?
// - 사용할 라이브러리 읽어보고 결정하기. node-mailer 같은 걸 쓴다고 함.

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const password = useRef("");
  const previousPageUrl = useRef("");
  const nextPageUrl = useRef("");
  const [verificationCodeInputValue, setVerificationCodeInputValue] =
    useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleOnChangeVerificationCodeInput = (e) => {
    const value = e.target.value;

    const RegExp = /\D/;

    const newValue = value.replace(RegExp, "");

    setVerificationCodeInputValue(newValue);
  };

  // 서버에서 인증 코드 검사.
  // 일치 -> 비밀번호 재설정 or 회원 가입 완료.
  // 불일치 -> alert.
  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isVerificationCodeValid(verificationCodeInputValue)) {
      alert(validationMessage);

      return;
    }

    const formData = {
      email,
      verificationCode: verificationCodeInputValue,
    };

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    if (previousPageUrl.current === PATH.LOGIN + "/find-password") {
      axios.post(url, formData).then((response) => {
        // if (response.data.result === "인증 번호 일치") {
        // 개발용 true 설정
        if (true) {
          alert(
            "이메일 인증이 완료되었습니다. 비밀번호 재설정 페이지로 이동합니다."
          );

          navigate(nextPageUrl.current, { state: { email } });

          return;
        }

        alert("인증 번호가 일치하지 않습니다. 인증 번호를 다시 확인해주세요.");

        return;
      });
    }

    if (previousPageUrl.current === PATH.LOGIN + "/register") {
      const newFormData = {
        ...formData,
        password: password.current,
        name: "이름 기본값(겹치지 않게)",
        profileImage: "프로필 이미지 기본값",
      };

      axios.post(url, newFormData).then((response) => {
        // if (response.data.result === "인증 번호 일치") {
        // 개발용 true 설정.
        if (true) {
          alert("회원 가입이 완료되었습니다. 프로필 설정 페이지로 이동합니다.");

          navigate(nextPageUrl.current, {
            state: { email, name: newFormData.name },
          });

          return;
        }

        alert("인증 번호가 일치하지 않습니다. 인증 번호를 다시 확인해주세요.");

        return;
      });
    }
  };

  // 이전 페이지서 navigate로 넘어온 데이터를 가지고 submit 다음에 렌더링될 페이지를 결정.
  // - 회원 가입 -> 프로필 설정 페이지
  // - 비밀번호 찾기 -> 비밀번호 재설정 페이지
  useEffect(() => {
    // 회원 가입 페이지나 비밀번호 찾기 페이지에서 넘어온 경우에만 이 페이지를 렌더링.
    // - 그 두 페이지에서 넘어온 경우에만 location.state가 존재할 테니까.
    // - 아니 근데 이걸로 되나? 다른 location.state.email/previousPageUrl 존재하는 페이지에서 넘어오면.. 특정 값이 없으면 버튼이 안 눌리게 해야 하나..?
    if (
      !location.state ||
      !location.state.email ||
      !location.state.previousPageUrl
    ) {
      alert("잘못된 접근입니다.");
      navigate(PATH.MAIN);

      return;
    }

    setEmail(location.state.email);

    previousPageUrl.current = location.state.previousPageUrl;

    // 회원 가입 페이지에서 넘어온 경우만 password를 가지고 있음.
    if (previousPageUrl.current === PATH.LOGIN + "/register") {
      password.current = location.state.password;
    }

    switch (previousPageUrl.current) {
      // 비밀 번호 찾기 페이지에서 넘어온 경우
      // -> 비밀 번호 재설정 페이지로 이동.
      case PATH.LOGIN + "/find-password":
        nextPageUrl.current = PATH.LOGIN + "/reset-password";
        break;
      // 회원 가입 페이지에서 넘어온 경우
      // -> 로그인 페이지로 이동.
      case PATH.LOGIN + "/register":
        nextPageUrl.current = PATH.LOGIN + "/create-profile";
        break;
      // 그 외의 경우
      // -> 홈으로 이동.
      // 근데 이건 없애도 되지 않나 싶음. 앞에서 한 번 걸렀으니까.
      default:
        alert("잘못된 접근입니다.");
        nextPageUrl.current = PATH.MAIN;
        break;
    }

    return;
  }, []);

  useEffect(() => {
    const newMessage = makeVerificationCodeVaildationMessage(
      verificationCodeInputValue
    );

    setValidationMessage((oldMessage) => newMessage);
  }, [verificationCodeInputValue]);

  return (
    <div className={styles.container}>
      <div>* 이메일 인증 번호 확인 페이지 *</div>

      <div>이메일 인증</div>
      <div>{email}로 인증 번호가 발송되었습니다.</div>
      <form>
        <label htmlFor="verificationCodeInput">인증 번호</label>
        <input
          type="text"
          name="verificationCode"
          id="verificationCodeInput"
          maxLength="6"
          placeholder="인증 번호 6자리 숫자를 입력해주세요."
          onChange={handleOnChangeVerificationCodeInput}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          value={verificationCodeInputValue}
        />
        <div>{validationMessage}</div>
        <input
          type="submit"
          value="확인"
          onClick={handleOnClickSubmitButton}
        ></input>
      </form>
    </div>
  );
}

function isVerificationCodeValid(verificationCode) {
  return verificationCode.length === 6;
}

function makeVerificationCodeVaildationMessage(verificationCode) {
  if (verificationCode === "") {
    return "인증 번호를 입력해주세요.";
  }

  if (!isVerificationCodeValid(verificationCode)) {
    return "인증 번호는 6자리 숫자입니다.";
  }

  return "";
}
