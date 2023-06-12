import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import mapPathnameToTitle from '../../../constants/mapPathnameToTitle';

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("문제리스트");
  
  useEffect(() => {
    const pathname = location.pathname;
    setTitle(() => mapPathnameToTitle[pathname]);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div
        className={styles.backIcon}
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          width="13"
          height="21"
          viewBox="0 0 13 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.714387 10.9413C0.319862 10.4904 0.365552 9.80504 0.816437 9.41052L10.7549 0.714363C11.2058 0.319838 11.8911 0.365528 12.2857 0.816413V0.816413C12.6802 1.2673 12.6345 1.95264 12.1836 2.34716L2.24514 11.0433C1.79425 11.4378 1.10891 11.3922 0.714387 10.9413V10.9413Z"
            fill="#3E3E3E"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.2856 19.6197C12.6801 19.1688 12.6344 18.4835 12.1836 18.089L2.2451 9.3928C1.79421 8.99827 1.10887 9.04396 0.71435 9.49485V9.49485C0.319825 9.94573 0.365515 10.6311 0.816401 11.0256L10.7549 19.7218C11.2057 20.1163 11.8911 20.0706 12.2856 19.6197V19.6197Z"
            fill="#3E3E3E"
          />
        </svg>
      </div>
      <div className="header-title">{title}</div>
      <div className={styles.settingsIcon}>
        <svg
          width="5"
          height="19"
          viewBox="0 0 5 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 2.5C5 3.88071 3.88071 5 2.5 5C1.11929 5 0 3.88071 0 2.5C0 1.11929 1.11929 0 2.5 0C3.88071 0 5 1.11929 5 2.5Z"
            fill="#3E3E3E"
          />
          <path
            d="M5 9.5C5 10.8807 3.88071 12 2.5 12C1.11929 12 0 10.8807 0 9.5C0 8.11929 1.11929 7 2.5 7C3.88071 7 5 8.11929 5 9.5Z"
            fill="#3E3E3E"
          />
          <path
            d="M5 16.5C5 17.8807 3.88071 19 2.5 19C1.11929 19 0 17.8807 0 16.5C0 15.1193 1.11929 14 2.5 14C3.88071 14 5 15.1193 5 16.5Z"
            fill="#3E3E3E"
          />
        </svg>
      </div>
    </div>
  );
};
export default Header;
