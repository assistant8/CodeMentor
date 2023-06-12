import React from "react";
import styles from "./Footer.module.scss";
import { useNavigate } from "react-router-dom";
import quizlist from "../../../image/quizlist.svg";
import home from "../../../image/home.svg";
import mypage from "../../../image/mypage.svg";

const Footer = () => {
  const navigate = useNavigate();
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
      <div
        className="menu-my-page"
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <img src={mypage} alt="마이페이지" />
        <div>마이페이지</div>
      </div>
    </div>
  );
};

export default Footer;
