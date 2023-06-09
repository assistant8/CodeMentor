import styles from "./CreateProfile.module.scss";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import PATH from "../../constants/path";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";
import defaultProfileImage from "../../image/defaultProfileImage.png";

export default function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultName = location.state.name;
  const [nameInputValue, setNameInputValue] = useState(defaultName);
  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const nameInput = useRef();
  const profileImageInput = useRef();
  const [selectedFile, setSelectedFile] = useState("");

  const handleOnChange_profileImageInput = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const fileDataURL = reader.result;

      setSelectedFile(fileDataURL);
      profileImageInput.current.value = "";
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOnChangeNameInput = (e) => {
    const value = e.target.value;

    setNameInputValue(value);
  };

  // 입력값이 조건에 부합해야 버튼이 활성화되게 만들어야겠음.
  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isNameValid(nameInputValue)) {
      alert(nameValidationMessage);

      nameInput.current.focus();

      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile === "" ? "" : selectedFile);
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
    <div className={styles.container_CreateProfile}>
      <img src="../../image/profileImage.png" alt="" />
      <div className={styles.topBar}>11:11</div>
      <div className={styles.logo}>프로필 설정</div>
      <form>
        <div className={styles.wrapper_Inputs}>
          <div
            className={styles.profileImage}
            onClick={() => {
              profileImageInput.current.click();
            }}
          >
            <div className={styles.editProfileImageButton}>
              edit
              <input
                ref={profileImageInput}
                type="file"
                name="profileImage"
                onChange={handleOnChange_profileImageInput}
              />
            </div>

            {selectedFile === "" ? (
              <img src={defaultProfileImage} alt="Profile" />
            ) : (
              <img src={selectedFile} alt="Profile" />
            )}
          </div>
          <div className={styles.buttons}>
            <button
              onClick={(e) => {
                e.preventDefault();
                profileImageInput.current.click();
              }}
            >
              편집
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();

                setSelectedFile("");
              }}
            >
              기본값
            </button>
          </div>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type="text"
              name="name"
              id="nameInput"
              maxLength="15"
              placeholder="너구리와함께사라지다"
              ref={nameInput}
              onChange={handleOnChangeNameInput}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              value={nameInputValue}
            />
            <div className={styles.validationMessage}>
              {nameValidationMessage}
            </div>
            <div
              className={styles.inputGuide}
              style={
                nameValidationMessage === "완벽합니다!"
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              * 이름은 공백을 제외한 2~10자로 설정해주세요.
            </div>
          </div>
        </div>

        <div className={styles.wrapper_buttons}>
          <VioletButton
            children={"시작하기"}
            onClick={handleOnClickSubmitButton}
          />
          <VioletButton
            children={"나중에 설정하기"}
            onClick={() => navigate(PATH.LOGIN)}
          />
        </div>
      </form>
    </div>
  );
}

function isNameValid(name) {
  if (name === "") {
    return false;
  }

  const nameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/;
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
