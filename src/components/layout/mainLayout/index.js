import React from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "../footer/index"
import Header from "../header/index";
import { useRecoilValue } from "recoil";

const MainLayout = ({children}) => {
  // Header 컴포넌트에서 title 설정해놓음, 굳이 MainLayout에서 건들 필요 없어보임
  // const headerTitle = useRecoilValue(headerTitle) 
  
  return (
    <div className={styles.Full}>
        <Header />
        <div className={styles.Inner}>
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default MainLayout;
