import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuSprout } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";

const User = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(()=>{
    setHeaderTitle("마이페이지")
  }, [setHeaderTitle]);

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

const Grade = ({ openModal, setIsOpen }) => {
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
        <svg
          width="43"
          height="52"
          viewBox="0 0 43 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.375 0.333313H38.125C39.3848 0.333313 40.593 0.824978 41.4838 1.70015C42.3746 2.57532 42.875 3.7623 42.875 4.99998V42.3333L38.125 40.3033V4.99998H9.625C9.625 3.7623 10.1254 2.57532 11.0162 1.70015C11.907 0.824978 13.1152 0.333313 14.375 0.333313ZM28.625 44.6666V14.3333H4.875V44.6666L16.75 39.58L28.625 44.6666ZM28.625 9.66665C31.2612 9.66665 33.375 11.7666 33.375 14.3333V51.6666L16.75 44.6666L0.125 51.6666V14.3333C0.125 13.0956 0.625445 11.9087 1.51624 11.0335C2.40704 10.1583 3.61522 9.66665 4.875 9.66665H28.625Z"
            fill="#3E3E3E"
          />
        </svg>

        <p>내가 찜한 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/complete")}
      >
        <svg
          width="57"
          height="49"
          viewBox="0 0 57 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4318 48.2433C19.0379 48.6555 18.3796 48.6555 17.9857 48.2433L0.660044 30.1097C0.290749 29.7232 0.290748 29.1146 0.660044 28.7281L7.8018 21.2534C8.19608 20.8407 8.85521 20.8412 9.24888 21.2544L17.9854 30.4254C18.3792 30.8388 19.0386 30.8391 19.4329 30.4261L47.7511 0.757486C48.1449 0.344901 48.8035 0.344737 49.1975 0.757123L56.34 8.2326C56.7093 8.61912 56.7093 9.22773 56.34 9.61424L19.4318 48.2433Z"
            fill="#3E3E3E"
          />
        </svg>

        <p>내가 푼 문제</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/chart")}
      >
        <svg
          width="51"
          height="47"
          viewBox="0 0 51 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.9166 46.375H0.083313V0.625H5.16665V41.2917H10.25V18.4167H20.4166V41.2917H25.5V8.25H35.6666V41.2917H40.75V28.5833H50.9166V46.375Z"
            fill="#3E3E3E"
          />
        </svg>

        <p>통계</p>
      </div>
      <div
        className={styles.menuContent}
        onClick={() => navigate("/mypage/mypost")}
      >
        <svg
          width="67"
          height="67"
          viewBox="0 0 67 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.25 5.58331C51.7308 5.58331 53.151 6.17156 54.198 7.21863C55.2451 8.26571 55.8334 9.68585 55.8334 11.1666V55.8333C55.8334 57.3141 55.2451 58.7342 54.198 59.7813C53.151 60.8284 51.7308 61.4166 50.25 61.4166H16.75C15.2692 61.4166 13.8491 60.8284 12.802 59.7813C11.7549 58.7342 11.1667 57.3141 11.1667 55.8333V11.1666C11.1667 9.68585 11.7549 8.26571 12.802 7.21863C13.8491 6.17156 15.2692 5.58331 16.75 5.58331H50.25ZM50.25 11.1666H36.2917V25.125L29.3125 18.7041L22.3334 25.125V11.1666H16.75V55.8333H50.25M36.2917 30.7083C37.396 30.7083 38.4754 31.0358 39.3936 31.6493C40.3118 32.2628 41.0274 33.1348 41.45 34.155C41.8726 35.1752 41.9832 36.2978 41.7677 37.3809C41.5523 38.464 41.0205 39.4588 40.2397 40.2397C39.4589 41.0205 38.464 41.5523 37.3809 41.7677C36.2979 41.9831 35.1753 41.8726 34.155 41.45C33.1348 41.0274 32.2628 40.3118 31.6493 39.3936C31.0358 38.4754 30.7084 37.3959 30.7084 36.2916C30.7084 34.8109 31.2966 33.3907 32.3437 32.3436C33.3908 31.2966 34.8109 30.7083 36.2917 30.7083ZM47.4584 53.0416H25.125V50.25C25.125 46.5371 32.5788 44.6666 36.2917 44.6666C40.0046 44.6666 47.4584 46.5371 47.4584 50.25V53.0416Z"
            fill="#3E3E3E"
          />
        </svg>

        <p>내가 작성한 글</p>
      </div>
    </div>
  );
};

const LogOut = () => {
  return <p className={styles.logout}>로그아웃</p>;
};

const GradeModal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.reactModalOverlay}>
      <div className={styles.reactModal}>{children}</div>
    </div>
  );
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
      <Grade setIsOpen={setIsOpen} openModal={openModal} />
      <Menu />
      <LogOut />
      <GradeModal isOpen={isOpen} onRequestClose={closeModal}>
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
      </GradeModal>
    </div>
  );
};

export default MyPage;
