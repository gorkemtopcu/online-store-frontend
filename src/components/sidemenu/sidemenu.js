import React, { useState } from 'react';
import './sidemenu.css';
import categories from 'constants/ProductCategories';


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
