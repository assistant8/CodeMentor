import styles from "./VerifyEmail.module.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [verificationCodeInputValue, setVerificationCodeInputValue] =
    useState("");
  console.log(verificationCodeInputValue);

  // 회원 가입 페이지에서 입력받은 email 주소 취득.
  const location = useLocation();
  const { email } = location.state;

  const handleOnClick_verificationCodeInput = () => {
    const formData = {
      email,
      verificationCode: verificationCodeInputValue,
    };

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios.post(url, formData).then((response) => {
      console.log(response.data.result);
      if (response.data.result === "일치") {
        navigate("/");
      } else {
        alert("인증 번호를 다시 확인해주세요.");
      }
    });
  };

  return (
    <div className={styles.container}>
      <div>* 이메일 인증 번호 확인 페이지 *</div>

      <div>이메일 인증</div>
      <div>'입력한 이메일 주소'로 인증 메일이 발송되었습니다.</div>
      <label htmlFor="verificationCodeInput">인증 번호</label>
      <input
        type="number"
        name="verificationCode"
        id="verificationCodeInput"
        placeholder="인증 번호 6자리를 입력해주세요."
        onInput={(e) => {
          setVerificationCodeInputValue(e.target.value);

          if (verificationCodeInputValue.length > 6) {
            const newValue = verificationCodeInputValue.slice(0, 6);

            setVerificationCodeInputValue(newValue);
          }
        }}
        value={verificationCodeInputValue}
      />
      <div onClick={handleOnClick_verificationCodeInput}>확인</div>
    </div>
  );
}
