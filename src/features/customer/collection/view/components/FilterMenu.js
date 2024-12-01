import React from "react";
import categories from "constants/ProductCategories";
import "./FilterMenu.css";

const FilterMenu = ({ onCategoryFilter }) => {
  const handleFilterChange = (categoryName, subCategoryName, isChecked) => {
    if (onCategoryFilter) {
      onCategoryFilter({
        mainCategory: categoryName,
        subCategory: isChecked ? subCategoryName : null,
      });
    }
  };

  const handleApplyFilters = () => {
    console.log("Filters applied!");
    //TODO: Filter applications
  };

  return (
    <div className="filter-menu-body">
      {categories.map((category, index) => (
        <div key={index} className="filter-category">
          <h4 className="filter-category-title">{category.name}</h4>
          <div className="filter-subcategories">
            {category.subcategories.map((subCategory, subIndex) => (
              <label key={subIndex} className="filter-subcategory">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleFilterChange(
                      category.name,
                      subCategory,
                      e.target.checked
                    )
                  }
                />
                {subCategory}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="filter-apply-button-container">
        <button className="filter-apply-button" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterMenu;
