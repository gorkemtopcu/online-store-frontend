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

const Sidemenu = ({ isOpen, toggleMenu }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName]
    }));
  };

  return (
    <div className={`sidemenu ${isOpen ? 'open' : ''}`}>
      <div className="sidemenu-header">
        <button onClick={toggleMenu} className="close-button">X</button>
      </div>
      {categories.map((category, index) => (
        <div key={index}>
          <div
            className="category-item"
            onClick={() => toggleCategory(category.name)}
          >
            {category.name}
          </div>
          {expandedCategories[category.name] && (
            <div className="subcategory-list">
              {category.subcategories.map((sub, subIndex) => (
                <div key={subIndex} className="subcategory-item">
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidemenu;
