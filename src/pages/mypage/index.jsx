import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuSprout } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";
import { Modal } from "../../components/modal";
import chart from "../../image/chart-bar.png";
import book from "../../image/book-account-outline.png";
import bookmark from "../../image/bookmark.svg";
import check from "../../image/check.svg";
import axios from "axios";

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

const Grade = ({ openModal }) => {
  return (
    <div className={styles.gradeInfo}>
      <div className={styles.gradeImg}>
        <img src="" alt="등급 아이콘" />
      </div>
      <h3>등급별 혜택보기</h3>
      <button onClick={openModal}>
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

const Menu = () => {
  let navigate = useNavigate();
  return (
    <div className={styles.menuContainer}>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/bookmark")}
      >
        <img src={bookmark} alt="내가 찜한 문제" />
        <p>내가 찜한 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/complete")}
      >
        <img src={check} alt="내가 푼 문제" />
        <p>내가 푼 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/chart")}
      >
        <img src={chart} alt="통계" />
        <p>통계</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/mypost")}
      >
        <img src={book} alt="내가 작성한 글" />
        <p>내가 작성한 글</p>
      </div>
    </div>
  );
};

const LogOut = () => {
  return <p className={styles.logout}>로그아웃</p>;
};

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <User />
      <Grade openModal={openModal} />
      <Menu />
      <LogOut />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GiCancel className={styles.closeBtn} onClick={closeModal} />
        <div className={styles.gradeContainer}>
          <div className={styles.gradeBox}>
            <div className={styles.gradeProfile}>
              <FaGraduationCap className={styles.gradeIcon} />
              <p>코드 멘토</p>
            </div>
            <div className={styles.description}>힌트 등록, 수정 가능</div>
          </div>
          <div className={styles.gradeBox}>
            <div className={styles.gradeProfile}>
              <LuSprout className={styles.gradeIcon} />
              <p>코드 멘티</p>
            </div>
            <div className={styles.description}>힌트 열람만 가능</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;
