import styles from "./ModifyUser.module.scss";
import { useNavigate } from "react-router-dom";
import { VioletButton } from "../../components/buttons/VioletButton";
import { UserInput } from "../../components/inputs/UserInput";
import { useState, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";

const ModifyUser = () => {
  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const onChange = (e) => {
    setUserName(e.target.value);
  };
  const modifyImg = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일 정보 가져오기
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result; // 파일을 URL 형태로 변환
      setImgUrl(url); // imgUrl 업데이트
    };
    if (file) {
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };
  const buttonRef = useRef(null);
  return (
    <div className={styles.modifyContainer}>
      <FaPencilAlt className={styles.pencilIcon} onClick={modifyImg} />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange} // 파일 선택 창은 보이지 않도록 설정
      />
      <div
        className={styles.modifyImg}
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <img src={imgUrl} alt="프사" />
      </div>
      <div className={styles.inputBox}>
        <UserInput
          placeholder="유저_1B789RS"
          value={userName}
          onChange={onChange}
        />
        <p>중복된 유저명입니다</p>
      </div>
      <VioletButton ref={buttonRef}>저장하기</VioletButton>
      <div className={styles.btns}>
        <p
          onClick={() => {
            navigate("/mypage/password");
          }}
        >
          비밀번호 변경
        </p>
        <p>회원 탈퇴</p>
      </div>
    </div>
  );
};
export default ModifyUser;
