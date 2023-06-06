import React from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "../footer/index"
import Header from "../header/index";


const MainLayout = ({children}) => {
  return (
    <div className={styles.Full}>
        <Header/>
        <div className={styles.Inner}>
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default MainLayout;