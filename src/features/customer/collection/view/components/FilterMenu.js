import React, { useState } from "react";
import "./FilterMenu.css";
import categories from "constants/ProductCategories";

const FilterMenu = ({ isOpen, toggleMenu, onCategoryFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (category, subCategory, isChecked) => {
    const updatedFilters = {
      ...selectedFilters,
      [category]: {
        ...selectedFilters[category],
        [subCategory]: isChecked,
      },
    };
    setSelectedFilters(updatedFilters);

    // OnCategoryFilter işlevini tetikle
    onCategoryFilter({
      mainCategory: category,
      subCategory: isChecked ? subCategory : null,
    });
  };

  return (
    <div className={`filter-menu ${isOpen ? "open" : ""}`}>
      <div className="filter-menu-header">
        <button onClick={toggleMenu} className="close-button">
          X
        </button>
      </div>
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

export default FilterMenu;
