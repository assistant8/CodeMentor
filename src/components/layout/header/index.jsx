import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import mapPathnameToTitle from '../../../constants/mapPathnameToTitle';
import back from '../../../image/back.png';
import threeDots from '../../../image/threeDots.png';

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("문제리스트");
  
  useEffect(() => {
    const pathname = location.pathname;
    setTitle(() => mapPathnameToTitle[pathname]);
    // console.log("title", pathname)
    // console.log("mapPathnameToTitle[pathname]", mapPathnameToTitle[pathname])
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <img 
        src={back}
        className={styles.backIcon}
        alt="backArrow"
        onClick={() => navigate(-1)}
      />
      <div className="header-title">{title}</div>
      <img 
        src={threeDots}
        className={styles.settingsIcon}
        alt="menu"
        onClick={() => {}}
      />
    </div>
  );
};
export default Header;
