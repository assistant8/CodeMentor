import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiBookmarks, BiCheck } from "react-icons/bi";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";

const User = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.userInfo}>
      <div className={styles.profileImg}>
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
    <div className={styles.gradeInfo}>
      <div className={styles.gradeImg}>
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
    <div className={styles.menuContainer}>
      <div className={styles.menuContent}>
        <BiBookmarks />
        <p>내가 찜한 문제</p>
      </div>
      <div className={styles.menuContent}>
        <BiCheck />
        <p>내가 푼 문제</p>
      </div>
      <div className={styles.menuContent}>
        <IoStatsChartSharp />
        <p>통계</p>
      </div>
      <div className={styles.menuContent}>
        <MdOutlineStickyNote2 />
        <p>내가 작성한 글</p>
      </div>
    </div>
  );
};

const LogOut = () => {
  return <p className={styles.logout}>로그아웃</p>;
};

const MyPage = () => {
  return (
    <div className={styles.container}>
      <User />
      <Grade />
      <Menu />
      <LogOut />
    </div>
  );
};

export default MyPage;
