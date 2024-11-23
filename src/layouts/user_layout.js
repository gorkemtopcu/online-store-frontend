import Navbar from "components/navbar/Navbar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./user_layout.css";
import SideMenu from "components/menu/SideMenu";

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
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <div
          className="content-container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
