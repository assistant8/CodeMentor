import styles from "./CreateProfile.module.scss";
import { useEffect, useState, useRef } from "react";

export default function CreateProfile() {
  const [nameInputValue, setNameInputValue] = useState("겹치지않는이름");
  const [nameVerificationMessage, setNameVerificationMessage] = useState("");
  const nameInput = useRef();

  const handleOnChange_nameInput = (e) => {
    setNameInputValue(e.target.value);
  };

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  useEffect(() => {
    if (nameInputValue === "") {
      setNameVerificationMessage("이름은 2-8 글자로 설정해주세요.");
    } else if (!checkNameValid(nameInputValue)) {
      setNameVerificationMessage("이름 형식이 올바르지 않습니다.");
    } else {
      setNameVerificationMessage("완벽합니다!");
    }
  });

  return (
    <div className={styles.container}>
      <div>* 회원 가입 후 최초 프로필 설정 페이지 *</div>
      <div>내 정보</div>
      <form>
        <div>
          사진
          <input type="file" />
        </div>
        <label htmlFor="nameInput">이름</label>
        <input
          type="text"
          name="name"
          id="nameInput"
          maxLength="8"
          placeholder="이름을 입력해주세요."
          ref={nameInput}
          onChange={handleOnChange_nameInput}
          value={nameInputValue}
        />
        <div>{nameVerificationMessage}</div>
        <input
          type="submit"
          value="시작하기"
          onClick={(e) => {
            e.preventDefault();
            console.log("클릭");
          }}
        />
      </form>
    </div>
  );
}

function checkNameValid(name) {
  const nameRegex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{2,8}$/;
  const result = nameRegex.test(name);

  return result;
}
