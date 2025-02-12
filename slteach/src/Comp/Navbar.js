import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [time, setTime] = useState(
        new Intl.DateTimeFormat("it-IT", {
            timeZone: "Europe/Rome",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).format(new Date())
    );

    const [isNavVisible, setIsNavVisible] = useState(window.innerWidth >= 768); // Show navbar by default on large screens

    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Intl.DateTimeFormat("it-IT", {
                    timeZone: "Europe/Rome",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }).format(new Date())
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Handle navbar visibility toggle on small screens
    const toggleNavbar = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <>
            <div className='navupper'>
                <h2>SL TEACH</h2>
                <div className='Logo' onClick={toggleNavbar}></div> {/* Click logo to show/hide navbar */}
                <div className="clock">{time}</div> {/* Italy time clock */}
            </div>

            <div className={`navcontainer ${isNavVisible ? "show" : ""}`}>
                <div className='navselections'>
                    <Link className={`navs ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                </div>
                <div className='navselections'>
                    <Link className={`navs ${location.pathname === "/page_generater" ? "active" : ""}`} to="/page_generater">Form Generator</Link>
                </div>
                <div className='navselections'>
                    <Link className={`navs ${location.pathname === "/form_viewer" ? "active" : ""}`} to="/form_viewer">Form Viewer</Link>
                </div>
                <div className='navselections'>
                    <Link className={`navs ${location.pathname === "/analysis" ? "active" : ""}`} to="/">Analysis</Link>
                </div>
                <div className='navselections'>
                    <Link className={`navs ${location.pathname === "/Pdf_management" ? "active" : ""}`} to="/Pdf_management">Pdf management</Link>
                </div>
                <div className='logout' />
                <div className='user-info'>
                    <h2 className='user'>A D M I N</h2>
                    <p>SHAN LIVERA</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;
