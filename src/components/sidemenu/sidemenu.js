import React, { useState } from 'react';
import './sidemenu.css';

const categories = [
    {
      name: "Women",
      subcategories: [
        "New In", "Basics", "Dresses & Jumpsuits", "Tops", "Shirts",
        "T-Shirts", "Sweatshirts", "Knitwear", "Pants", "Skirts",
        "Jeans", "Outerwear", "Shoes", "Accessories", "Swimwear", "Lingerie"
      ]
    },
    {
      name: "Men",
      subcategories: [
        "New In", "Basics", "Suits", "Blazers", "Shirts",
        "T-Shirts", "Sweatshirts", "Knitwear", "Pants", "Shorts",
        "Outerwear", "Shoes", "Accessories"
      ]
    },
    {
      name: "Kids",
      subcategories: [
        "New In",
        "Girl (6-14 years)", "Boy (6-14 years)",
        "Baby Girl (0-5 years)", "Baby Boy (0-5 years)"
      ]
    }
];

const SideMenu = ({ isOpen, toggleMenu }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleCategoryClick = (categoryName) => {
        setExpandedCategory(prevCategory => 
            prevCategory === categoryName ? null : categoryName
        );
    };

    return (
        <>
            <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={toggleMenu}></div>
            <div className={`sidemenu ${isOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleMenu}>×</button>
                <h2 className="sidemenu-title">Categories</h2>
                {categories.map(category => (
                    <div key={category.name}>
                        <div 
                            className="category-title" 
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            {category.name}
                            <span className="icon">
                                {expandedCategory === category.name ? "▼" : "►"}
                            </span>
                        </div>
                        {expandedCategory === category.name && (
                            <ul className="subcategory-list">
                                {category.subcategories.map(subcategory => (
                                    <li key={subcategory} className="subcategory">
                                        {subcategory}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SideMenu;
