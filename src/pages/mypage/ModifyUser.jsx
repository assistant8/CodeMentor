import styles from "./ModifyUser.module.scss";
import { useNavigate } from "react-router-dom";
import { VioletButton } from "../../components/buttons/VioletButton";

const ModifyUser = () => {
  let navigate = useNavigate();
  return (
    <div class={styles.modifyContainer}>
      <div class={styles.modifyImg}>
        <img src="" alt="프사" />
      </div>
      <div className={styles.inputBox}>
        <input placeholder="유저_1B789RS" />
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
