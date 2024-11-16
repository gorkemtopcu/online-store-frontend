import React, { useState } from "react";
import categories from "../../../../../constants/categories";

const ProductSearchFilter = ({ onSearch, onSort, onCategoryFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value; 
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term); 
    }
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSort(option);
  };

  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = e.target.value;
    setMainCategory(selectedMainCategory);
    setSubCategory("");
  };

  const applyCategoryFilter = () => {
    onCategoryFilter({ mainCategory, subCategory });
  };

  return (
    <div className="product-search-filter">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Main Category Selection */}
      <select value={mainCategory} onChange={handleMainCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Subcategory Selection */}
      {mainCategory && (
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {categories
            .find((category) => category.name === mainCategory)
            ?.subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
      )}

      {/* Sorting Selection */}
      <select value={sortOption} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="popularity">Popularity</option>
      </select>

      {/* Apply Filters */}
      <button onClick={applyCategoryFilter}>Apply Filters</button>
    </div>
  );
};

export default ProductSearchFilter;
