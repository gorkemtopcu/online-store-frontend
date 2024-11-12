import Navbar from 'components/navbar/Navbar';
import Sidemenu from 'components/sidemenu/sidemenu';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './user_layout.css';

const UserLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <Navbar />
            <button onClick={toggleMenu} className="menu-toggle-button">
                ☰
            </button>
            <div className="layout-container">
                <Sidemenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
