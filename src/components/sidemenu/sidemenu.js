import React, { useState } from "react";
import "./sidemenu.css";
import categories from "constants/ProductCategories";

const Sidemenu = ({ isOpen, toggleMenu }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (category, subCategory, isChecked) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [subCategory]: isChecked,
      },
    }));
  };

  return (
    <div className={`sidemenu ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleMenu}>
        X
      </button>
      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <div className="category-name">{category.name}</div>
          {category.subcategories.map((sub, subIndex) => (
            <div key={subIndex} className="subcategory-item">
              <input
                type="checkbox"
                id={`${category.name}-${sub}`}
                onChange={(e) =>
                  handleFilterChange(category.name, sub, e.target.checked)
                }
              />
              <label htmlFor={`${category.name}-${sub}`}>{sub}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidemenu;
