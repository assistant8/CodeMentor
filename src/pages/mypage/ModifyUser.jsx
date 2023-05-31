import styles from "./ModifyUser.module.scss";
import { useNavigate } from "react-router-dom";
import { VioletButton } from "../../components/buttons/VioletButton";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useRef } from "react";

const ModifyUser = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const onChange = (e) => {
    setUserName(e.target.value);
  };
  const modifyImg = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={styles.modifyContainer}>
      <FaPencilAlt className={styles.pencilIcon} onClick={modifyImg} />
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }} // 파일 선택 창은 보이지 않도록 설정
      />
      <div className={styles.modifyImg}>
        <img src="" alt="프사" />
      </div>
      <div className={styles.inputBox}>
        <input
          placeholder="유저_1B789RS"
          value={userName}
          onChange={onChange}
        />
        <p>중복된 유저명입니다</p>
      </div>
      <VioletButton>저장하기</VioletButton>
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
