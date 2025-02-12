import React from "react";
import "./Nopage.css";
import Navbar from "./Navbar";

const Nopage = () => {
    return (
        <>
        <Navbar/>
         <div className="maincontainer">
            <div className="animation-container">
                <h1 className="animated-404">404</h1>
                <p className="nopage-message">Page Not Found</p>
            </div>
        </div>
        </>
       
    );
};

export default Nopage;