import { Routes, Route, Link } from "react-router-dom";
import "./index.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const User = () => {
  return (
    <div className="user-info">
      <div className="profile-img">
        <img src="" alt="프사" />
      </div>
      <div style={{ display: "flex" }}>
        <h3>코드의 신,</h3>
        <h3>낭니</h3>
      </div>
      <button>
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

const Grade = () => {
  return (
    <div className="grade-info">
      <div className="grade-img">
        <img src="" alt="등급 아이콘" />
      </div>
      <h3>등급별 혜택보기</h3>
      <button>
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

const MyPage = () => {
  return (
    <div className="container">
      <User />
      <Grade />
    </div>
  );
};

export default MyPage;
