import styles from "./CreateProfile.module.scss";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import PATH from "../../constants/path";

export default function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultName = location.state.name;
  const defaultImage = "기본 이미지";
  const [nameInputValue, setNameInputValue] = useState(defaultName);
  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const nameInput = useRef();
  const [selectedFile, setSelectedFile] = useState(defaultImage);

  const handleOnChange_profileImageInput = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const fileDataURL = reader.result;

      setSelectedFile(fileDataURL);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOnChange_nameInput = (e) => {
    const value = e.target.value;

    // if (value.includes(" ")) {
    //   const RegExp = / /g;
    //   const newValue = value.replace(RegExp, "");

    //   setNameInputValue(newValue);

    //   return;
    // }

    // if (value.length > 10) {
    //   const newValue = value.slice(0, 10);

    //   setNameInputValue(newValue);

    //   return;
    // }

    setNameInputValue(value);
  };

  // 입력값이 조건에 부합해야 버튼이 활성화되게 만들어야겠음.
  const handleOnClick_submitButton = (e) => {
    e.preventDefault();

    if (!isNameValid(nameInputValue)) {
      alert(nameValidationMessage);

      nameInput.current.focus();

      return;
    }

    const formData = new FormData();
    formData.append(
      "profileImg",
      selectedFile !== defaultImage ? selectedFile : null
    );
    formData.append(
      "name",
      nameInputValue !== defaultName ? nameInputValue : null
    );

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
    const newValidationMessage = makeNameValidationMessage(nameInputValue);

    setNameValidationMessage(newValidationMessage);
  }, [nameInputValue]);

  return (
    <div className={styles.container}>
      <div>* 회원 가입 후 최초 프로필 설정 페이지 *</div>
      <div>내 정보</div>
      <form>
        <div>
          사진
          <input
            type="file"
            name="profileImage"
            onChange={handleOnChange_profileImageInput}
          />
          {selectedFile && <img src={selectedFile} alt="Profile" />}
        </div>
        <label htmlFor="nameInput">이름</label>
        <input
          type="text"
          name="name"
          id="nameInput"
          maxLength="15"
          placeholder="너구리와함께사라지다"
          ref={nameInput}
          onChange={handleOnChange_nameInput}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          value={nameInputValue}
        />
        <div>{nameValidationMessage}</div>
        <div>이름은 공백을 제외한 2~10자의 한글, 영문만 입력 가능합니다.</div>
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

function isNameValid(name) {
  if (name === "") {
    return false;
  }

  const nameRegex = /^[a-zA-Z가-힣]{2,10}$/;
  const result = nameRegex.test(name);

  return result;
}

function makeNameValidationMessage(nameInputValue) {
  if (nameInputValue === "") {
    return "사용할 이름을 입력해주세요.";
  }

  if (!isNameValid(nameInputValue)) {
    return "유효하지 않은 이름입니다.";
  }

  return "완벽합니다!";
}
