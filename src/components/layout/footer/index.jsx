import React from "react";
import styles from "./Footer.module.scss";
import { useNavigate } from "react-router-dom";
import quizlist from "../../../image/quizlist.svg";
import home from "../../../image/home.svg";
import mypage from "../../../image/mypage.svg";
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";

const Footer = () => {
  const navigate = useNavigate();

  // 관리자 계정 확인하기 (userGrade === "admin" 이면 관리자)
  const userGrade = useRecoilValue(userState).grade;
  
  const Mypage = ({ userGrade }) => {
    return (
      <div
        className="menu-my-page"
        onClick={() => {
          navigate(userGrade === "general" ? "/mypage" : userGrade === "admin" ? "/admin" : "/login");
        }}
      >
        <img src={mypage} alt={userGrade === "general" ? "마이페이지" : userGrade === "admin" ? "관리자페이지" : "로그인"} />
        <div>{userGrade === "general" ? "마이페이지" : userGrade === "admin" ? "관리자페이지" : "로그인"}</div>
      </div>
    );
  };

  return (
    <div className={styles.footer}>
      <div
        className="menu-quiz-list"
        onClick={() => {
          navigate("/quizlist");
        }}
      >
        <img src={quizlist} alt="문제목록" />
        <div>문제목록</div>
      </div>
      <div
        className="home"
        onClick={() => {
          navigate("/home");
        }}
      >
        <img src={home} alt="홈" />
        <div>홈</div>
      </div>
      <Mypage userGrade={userGrade} />
    </div>
  );
};

export default Footer;
