import styles from "./CreateProfile.module.scss";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { api } from "../../libs/utils/api.js";
import PATH from "../../constants/path";
import { LoginHeader } from "../../components/headers/LoginHeader";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";
import defaultProfileImage from "../../image/defaultProfileImage.png";
import { set } from "date-fns";

export default function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const defaultName = location?.state?.name;
  const userNameInput = useRef();
  const profileImageInput = useRef();

  const [profileImageInputFile, setProfileImageInputFile] = useState("");
  const [profileImageFileURL, setProfileImageFileURL] = useState("");
  const [formInputValue, setFormInputValue] = useState({
    userName: "",
  });
  const { userName } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({ userName: "" });

  const handleOnChangeFormInput = (e) => {
    const value = e.target.value;

    setFormInputValue((prev) => ({ ...prev, userName: value }));

    return;
  };

  const handleOnChangeProfileImageInput = (e) => {
    const file = e.target.files[0];

    setProfileImageInputFile(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const fileURL = reader.result;

      setProfileImageFileURL(fileURL);

      return;
    };
  };

  // * 소셜 로그인 기능을 넣는다면 이메일 회원 가입이랑 다른 결과를 줘야 할 것.
  // - 소셜 -> 로그인 완료 상태로 홈으로 이동.
  // - 이메일 -> 로그인 되지 않은 상태로 로그인 페이지로 이동.
  const handleOnClickSubmitButton = (e) => {
    e.preventDefault();

    if (!isUserNameValid(userName)) {
      alert(validationMessage.userName);

      userNameInput.current.focus();

      return;
    }

    const formData = new FormData();

    formData.append("image", profileImageInputFile);
    formData.append("userName", userName);

    try {
      const response = api.put("/user/profile", formData);
      const result = response.data.result;

      if (result === "프로필 생성 성공") {
        if ("소셜-회원-가입") {
          alert("프로필 생성이 완료되었습니다.");

          navigate(PATH.HOME);

          return;
        }

        // if ("이메일-회원-가입") {
        if (true) {
          alert("프로필 생성이 완료되었습니다. 로그인 페이지로 이동합니다.");

          navigate(PATH.LOGIN);

          return;
        }
      }
    } catch (error) {
      alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

      console.log(error);

      return;
    }
  };

  useEffect(() => {
    userNameInput.current.focus();
  }, []);

  useEffect(() => {
    const newMessage = makeUserNameValidationMessage(userName);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      userName: newMessage,
    }));
  }, [userName]);

  return (
    <div className={styles.container_CreateProfile}>
      <img src="../../image/profileImage.png" alt="" />
      <div className={styles.topBar}>11:11</div>
      <div className={styles.wrapper_header}>
        <LoginHeader children={"프로필 설정"} />
      </div>
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
                onChange={handleOnChangeProfileImageInput}
              />
            </div>

            {profileImageFileURL === "" ? (
              <img src={defaultProfileImage} alt="Profile" />
            ) : (
              <img src={profileImageFileURL} alt="Profile" />
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

                setProfileImageInputFile("");
              }}
            >
              기본값
            </button>
          </div>
          <div className={styles.wrapper_InputAndValidationMessage}>
            <UserInput
              type="text"
              name="userName"
              maxLength="15"
              placeholder="이름"
              ref={userNameInput}
              onChange={handleOnChangeFormInput}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              value={userName}
            />
            <div className={styles.validationMessage}>
              {validationMessage.userName}
            </div>
            <div
              className={styles.inputGuide}
              style={
                validationMessage.userName === "완벽합니다!"
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
          {/* <VioletButton
            children={"나중에 설정하기"}
            onClick={handleSetProfileLater}
          /> */}
        </div>
      </form>
    </div>
  );
}

function isUserNameValid(userName) {
  if (userName === "") {
    return false;
  }

  const userNameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]{2,10}$/;
  const result = userNameRegex.test(userName);

  return result;
}

function makeUserNameValidationMessage(userName) {
  if (userName === "") {
    return "사용할 이름을 입력해주세요.";
  }

  if (!isUserNameValid(userName)) {
    return "유효하지 않은 이름입니다.";
  }

  return "완벽합니다!";
}
