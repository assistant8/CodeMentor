import "./ModifyUser.scss";
import { useNavigate } from "react-router-dom";

const ModifyUser = () => {
  let navigate = useNavigate();
  return (
    <div class="modify-container">
      <div class="modify-img">
        <img src="" alt="프사" />
      </div>
      <div className="input-box">
        <input placeholder="유저_1B789RS" />
        <p>중복된 유저명입니다</p>
      </div>
      <button>저장하기</button>
      <div className="btns">
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
