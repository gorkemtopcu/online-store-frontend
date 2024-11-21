import Navbar from 'components/navbar/Navbar';
import Sidemenu from 'components/sidemenu/sidemenu';
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './user_layout.css';

const UserLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Sidemenu only appears on the "collections" page
    const isCollectionPage = location.pathname.includes('/collections');

    return (
        <div>
            <Navbar />
            {isCollectionPage && (
                <button onClick={toggleMenu} className="menu-toggle-button">
                    ☰
                </button>
            )}
            <div className="layout-container">
                {isCollectionPage && (
                    <Sidemenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                )}
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
