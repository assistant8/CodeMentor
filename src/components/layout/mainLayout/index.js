import React from "react";
import "./MainLayout.scss";
import { Outlet } from "react-router-dom";
import Footer from "../footer/index"
import Header from "../header/index";


const MainLayout = ({children}) => {
  return (
    <div className="Full">
        <Header/>
        <div className="Inner">
            {children}
        </div>
        <Footer/>
    </div>
  );
};

export default MainLayout;