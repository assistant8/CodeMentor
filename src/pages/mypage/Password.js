import "./Password.scss";

const PassWord = () => {
  return (
    <div className="pwd-container">
      <p className="pwd-title">비밀번호 변경</p>
      <div className="inputs-container">
        <div className="input-box" id="present-pwd">
          <input placeholder="현재 비밀번호" />
        </div>
        <div className="input-box">
          <input placeholder="비밀번호" />
          <p>영문 대소문자 포함 8~12자리</p>
        </div>
        <div className="input-box">
          <input placeholder="비밀번호 확인" />
          <p>비밀번호가 일치하지 않습니다</p>
        </div>
        <button>변경하기</button>
      </div>
    </div>
  );
};

export default PassWord;
