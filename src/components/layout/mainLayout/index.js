import React from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "../footer/index"
import Header from "../header/index";
import { useRecoilState } from "recoil";
import { headerTitleState } from "../../../state/headerTitleState";


const MainLayout = ({children}) => {
  const [headerTitle, setHeaderTitle] = useRecoilState(headerTitleState)
  
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