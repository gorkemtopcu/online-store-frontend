import Navbar from "components/navbar/Navbar";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FilterMenu from "features/customer/collection/view/components/FilterMenu";
import "./user_layout.css";

const UserLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Menü toggle işlevi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Kategori filtreleme işlevi
  const handleCategoryFilter = ({ mainCategory, subCategory }) => {
    console.log("Selected Category:", mainCategory);
    console.log("Selected Subcategory:", subCategory);
    // Burada kategori filtreleme işlemi gerçekleştirebilirsiniz.
  };

  // Menü sadece "/collections" sayfasında görüntülenecek
  const isCollectionPage = location.pathname.includes("/collections");

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
          <FilterMenu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            onCategoryFilter={handleCategoryFilter} // Yeni prop eklendi
          />
        )}
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
