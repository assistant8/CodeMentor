import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiBookmarks, BiCheck } from "react-icons/bi";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";

const User = () => {
  let navigate = useNavigate();
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
        <MdOutlineKeyboardArrowRight
          onClick={() => navigate("/mypage/modify")}
        />
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

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-content">
        <BiBookmarks />
        <p>내가 찜한 문제</p>
      </div>
      <div className="menu-content">
        <BiCheck />
        <p>내가 푼 문제</p>
      </div>
      <div className="menu-content">
        <IoStatsChartSharp />
        <p>통계</p>
      </div>
      <div className="menu-content">
        <MdOutlineStickyNote2 />
        <p>내가 작성한 글</p>
      </div>
    </div>
  );
};

const LogOut = () => {
  return <p className="logout">로그아웃</p>;
};

const MyPage = () => {
  return (
    <div className="container">
      <User />
      <Grade />
      <Menu />
      <LogOut />
    </div>
  );
};

export default MyPage;
