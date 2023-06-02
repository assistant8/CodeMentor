import React from "react";
import styles from "./Footer.module.scss";
import { useNavigate } from "react-router-dom";

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
        <svg
          width="21"
          height="17"
          viewBox="0 0 21 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.10811 0.566667H21V2.83333H5.10811V0.566667ZM5.10811 9.63333V7.36667H21V9.63333H5.10811ZM1.7027 0C2.15429 0 2.58738 0.179106 2.9067 0.497918C3.22601 0.81673 3.40541 1.24913 3.40541 1.7C3.40541 2.15087 3.22601 2.58327 2.9067 2.90208C2.58738 3.22089 2.15429 3.4 1.7027 3.4C1.25112 3.4 0.818029 3.22089 0.49871 2.90208C0.179391 2.58327 0 2.15087 0 1.7C0 1.24913 0.179391 0.81673 0.49871 0.497918C0.818029 0.179106 1.25112 0 1.7027 0ZM1.7027 6.8C2.15429 6.8 2.58738 6.97911 2.9067 7.29792C3.22601 7.61673 3.40541 8.04913 3.40541 8.5C3.40541 8.95087 3.22601 9.38327 2.9067 9.70208C2.58738 10.0209 2.15429 10.2 1.7027 10.2C1.25112 10.2 0.818029 10.0209 0.49871 9.70208C0.179391 9.38327 0 8.95087 0 8.5C0 8.04913 0.179391 7.61673 0.49871 7.29792C0.818029 6.97911 1.25112 6.8 1.7027 6.8ZM5.10811 16.4333V14.1667H21V16.4333H5.10811ZM1.7027 13.6C2.15429 13.6 2.58738 13.7791 2.9067 14.0979C3.22601 14.4167 3.40541 14.8491 3.40541 15.3C3.40541 15.7509 3.22601 16.1833 2.9067 16.5021C2.58738 16.8209 2.15429 17 1.7027 17C1.25112 17 0.818029 16.8209 0.49871 16.5021C0.179391 16.1833 0 15.7509 0 15.3C0 14.8491 0.179391 14.4167 0.49871 14.0979C0.818029 13.7791 1.25112 13.6 1.7027 13.6Z"
            fill="#3E3E3E"
          />
        </svg>
        <div>문제목록</div>
      </div>
      <div className="menu-community">
        <svg
          width="23"
          height="18"
          viewBox="0 0 23 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 15.125V17.375H0.25V15.125C0.25 15.125 0.25 10.625 8.125 10.625C16 10.625 16 15.125 16 15.125ZM12.0625 4.4375C12.0625 3.65873 11.8316 2.89746 11.3989 2.24994C10.9663 1.60242 10.3513 1.09774 9.63182 0.799723C8.91233 0.501703 8.12063 0.423727 7.35683 0.575656C6.59303 0.727586 5.89144 1.1026 5.34077 1.65327C4.7901 2.20393 4.41509 2.90553 4.26316 3.66933C4.11123 4.43313 4.1892 5.22483 4.48722 5.94431C4.78524 6.6638 5.28992 7.27875 5.93744 7.71141C6.58496 8.14407 7.34624 8.375 8.125 8.375C9.16929 8.375 10.1708 7.96016 10.9092 7.22173C11.6477 6.48331 12.0625 5.48179 12.0625 4.4375ZM15.9325 10.625C16.6241 11.1602 17.19 11.8405 17.5904 12.6179C17.9908 13.3954 18.2159 14.2512 18.25 15.125V17.375H22.75V15.125C22.75 15.125 22.75 11.0412 15.9325 10.625ZM14.875 0.499998C14.1006 0.495686 13.3433 0.727198 12.7037 1.16375C13.3871 2.11858 13.7546 3.26332 13.7546 4.4375C13.7546 5.61168 13.3871 6.75642 12.7037 7.71125C13.3433 8.1478 14.1006 8.37931 14.875 8.375C15.9193 8.375 16.9208 7.96016 17.6592 7.22173C18.3977 6.48331 18.8125 5.48179 18.8125 4.4375C18.8125 3.39321 18.3977 2.39169 17.6592 1.65327C16.9208 0.914841 15.9193 0.499998 14.875 0.499998Z"
            fill="#3E3E3E"
          />
        </svg>
        <div>커뮤니티</div>
      </div>
      <div
        className="menu-my-page"
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 0C11.8924 0 13.2277 0.553123 14.2123 1.53769C15.1969 2.52226 15.75 3.85761 15.75 5.25C15.75 6.64239 15.1969 7.97775 14.2123 8.96231C13.2277 9.94688 11.8924 10.5 10.5 10.5C9.10761 10.5 7.77225 9.94688 6.78769 8.96231C5.80312 7.97775 5.25 6.64239 5.25 5.25C5.25 3.85761 5.80312 2.52226 6.78769 1.53769C7.77225 0.553123 9.10761 0 10.5 0ZM10.5 13.125C16.3013 13.125 21 15.4744 21 18.375V21H0V18.375C0 15.4744 4.69875 13.125 10.5 13.125Z"
            fill="#3E3E3E"
          />
        </svg>
        <div>마이페이지</div>
      </div>
    </div>
  );
};

export default Footer;
