import styles from "./CreateProfile.module.scss";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { api } from "../../libs/utils/api.js";
import PATH from "../../constants/path";
import { LoginHeader } from "../../components/headers/LoginHeader";
import { SmallVioletButton } from "../../components/buttons/SmallVioletButton.jsx";
import { VioletButton } from "../../components/buttons/VioletButton.jsx";
import { UserInput } from "../../components/inputs/UserInput.jsx";
import defaultProfileImage from "../../image/defaultProfileImage.png";

export default function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  console.log(email, password);
  const id = useRef("");
  // const defaultName = location?.state?.name;
  const userNameInput = useRef();
  const profileImageInput = useRef();

  const [profileImageInputFile, setProfileImageInputFile] = useState(null);
  const [profileImageFileURL, setProfileImageFileURL] = useState(null);
  const [formInputValue, setFormInputValue] = useState({
    userName: "",
  });
  const { userName } = formInputValue;
  const [validationMessage, setValidationMessage] = useState({ userName: "" });
  const [VioletButtonDisabled, setVioletButtonDisabled] = useState(false);

  const handleOnChangeFormInput = (e) => {
    const value = e.target.value;

    setFormInputValue((prev) => ({ ...prev, userName: value }));

    return;
  };

  const handleOnChangeProfileImageInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImageInputFile(file);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const fileURL = reader.result;

        setProfileImageFileURL(fileURL);

        return;
      };
    }
  };

  // * 소셜 로그인 기능을 넣는다면 이메일 회원 가입이랑 다른 결과를 줘야 할 것.
  // - 소셜 -> 로그인 완료 상태로 홈으로 이동.
  // - 이메일 -> 로그인 되지 않은 상태로 로그인 페이지로 이동.
  const handleOnClickSubmitButton = async (e) => {
    e.preventDefault();

    if (!isUserNameValid(userName)) {
      alert(validationMessage.userName);

      userNameInput.current.focus();

      return;
    }

    // userName 변경.
    try {
      const formData = {
        userName,
        password,
      };
      const response = await api.put(
        `/users/profile/?email=${email}`,
        formData
      );
      const data = await response.data;

      // "userName": "JohnDoe5"
      if (response.status === 200) {
        alert(`개발용: userName ${data.userName}으로 변경 성공.`);
      } else {
        alert(`개발용: userName 변경 실패`);

        console.log(response.status, data);

        return;
      }
    } catch (error) {
      alert("form userName: 서버와의 통신에 실패했습니다. 다시 시도해주세요.");
      console.log(error);

      return;
    }

    // 이미지 변경.
    // -> ''로 넘기면 서버에서 잘 받을 수 있나? 기본값으로 설정하고 싶은데.
    try {
      const formData = new FormData();

      formData.append("image", profileImageInputFile);

      console.log(formData.get("image"));

      const axiosOption = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await api.post(
        `/users/profile/:${id.current}/upload-image`,
        formData,
        axiosOption
      );

      const data = await response.data;

      if (response.status === 200) {
        alert("개발용: 프로필 이미지 변경 성공.");

        alert("프로필 생성이 완료되었습니다. 로그인 페이지로 이동합니다.");

        navigate(PATH.LOGIN);

        return;
      } else {
        alert("개발용: 프로필 이미지 변경 실패.");

        console.log(response.status, response.data);

        return;
      }
    } catch (error) {
      alert("form image: 서버와의 통신에 실패했습니다. 다시 시도해주세요.");
      console.log(error);

      return;
    }
  };

  const handleSetProfileLater = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        password,
        userName: `코딩용사${id.current}`,
      };

      console.log(formData.userName);

      const response = await api.put(
        `/users/profile/?email=${email}`,
        formData
        // {
        //   validateStatus: (status) => status < 500,
        // }
      );
      const data = await response.data;

      if (response.status === 200) {
        alert("기본 프로필을 사용합니다. 로그인 페이지로 이동합니다.");

        navigate(PATH.LOGIN);
      } else {
        alert(`개발용: 기본 프로필 설정 실패 실패`);

        console.log(response.status, data);

        return;
      }
    } catch (error) {
      alert("서버와의 통신에 실패했습니다. 다시 시도해주세요.");

      return;
    }
  };

  useEffect(() => {
    userNameInput.current.focus();
  }, []);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await api.get(`/users/profile/?email=${email}`);
        const data = await response.data;

        if (response.status === 200) {
          id.current = data.id;

          return;
        }
      } catch (error) {
        alert("유저 정보를 불러오지 못했습니다.");

        return;
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    setVioletButtonDisabled(!isUserNameValid(userName));

    const newMessage = makeUserNameValidationMessage(userName);

    setValidationMessage((oldMessage) => ({
      ...oldMessage,
      userName: newMessage,
    }));
  }, [userName]);

  return (
    <div className={styles.container_CreateProfile}>
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
            {/* <div className={styles.editProfileImageButton}>
              edit */}
            <input
              style={{ display: "none" }}
              ref={profileImageInput}
              type="file"
              name="profileImage"
              onChange={handleOnChangeProfileImageInput}
            />
            {/* </div> */}

            {profileImageFileURL === null ? (
              <img src={defaultProfileImage} alt="defaultProfileImage" />
            ) : (
              <img src={profileImageFileURL} alt="profileImageFileURL" />
            )}
          </div>
          <div className={styles.buttons}>
            <SmallVioletButton
              children={"수정"}
              onClick={(e) => {
                e.preventDefault();

                profileImageInput.current.click();
              }}
            />
            <SmallVioletButton
              children={"기본값"}
              onClick={(e) => {
                e.preventDefault();

                setProfileImageInputFile(null);
                setProfileImageFileURL(null);
              }}
            />
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
            children={"프로필 설정 완료"}
            onClick={handleOnClickSubmitButton}
            disabled={VioletButtonDisabled}
            style={
              VioletButtonDisabled
                ? { backgroundColor: "lightgray", cursor: "default" }
                : { backgroundColor: "#6700e6" }
            }
          />
          <VioletButton
            children={"나중에 설정하기"}
            onClick={handleSetProfileLater}
            style={
              isUserNameValid(userName)
                ? { display: "none" }
                : { display: "block" }
            }
          />
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
