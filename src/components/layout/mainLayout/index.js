import React from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "../footer/index"
import Header from "../header/index";
import { useRecoilState } from "recoil";
import { headerTitleState } from "../../../state/headerTitleState";


const MainLayout = ({children}) => {
  const [headerTitle, setHeaderTitle] = useRecoilState(headerTitleState) //헤더로 전달안하고 헤더에서 직접 받아도 될 것
  
  return (
    <div className={styles.Full}>
        <Header headerTitle={headerTitle}/>
        <div className={styles.Inner}>
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default MainLayout;
