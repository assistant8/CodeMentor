import styles from "./CreateProfile.module.scss";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import PATH from "../../constants/path";

export default function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultName = location.state.name;
  const [nameInputValue, setNameInputValue] = useState(defaultName);
  const [nameVerificationMessage, setNameVerificationMessage] = useState("");
  const nameInput = useRef();
  // 프로필 이미지 파일 업로드 기능 구현 필요.

  const handleOnChange_nameInput = (e) => {
    setNameInputValue(e.target.value);
  };

  // 입력값이 조건에 부합해야 버튼이 활성화되게 만들어야겠음.
  const handleOnClick_submitButton = (e) => {
    e.preventDefault();

    if (nameInputValue === "") {
      alert("이름을 입력해주세요.");

      return;
    }

    if (!checkNameValid(nameInputValue)) {
      alert("이름을 다시 확인해주세요.");

      return;
    }

    const formData = {
      profileImg: "사용자가 등록한  이미지",
      name: nameInputValue,
    };

    const url = "https://eonaf45qzbokh52.m.pipedream.net";

    axios
      .put(url, formData)
      .then((response) => {
        // if (response.data.result === "프로필 설정 완료") {
        // 개발용 true 설정
        if (true) {
          alert("프로필 설정이 완료되었습니다. 로그인 페이지로 이동합니다.");

          navigate(PATH.LOGIN);

          return;
        }
      })
      .catch((error) => {
        console.log(error);
        alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");
      });
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
  }, [nameInputValue]);

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
          onClick={handleOnClick_submitButton}
        />
        <input
          type="submit"
          value="나중에 설정하기"
          onClick={() => navigate(PATH.LOGIN)}
        />
      </form>
    </div>
  );
}

function checkNameValid(name) {
  const nameRegex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/;
  const result = nameRegex.test(name);

  return result;
}
