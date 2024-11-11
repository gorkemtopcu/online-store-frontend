import React, { useState } from "react";
import categories from "./categories"; // Kategorilerin bulunduğu dosya yolunu belirtin

const ProductSearchFilter = ({ onSearch, onSort, onCategoryFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Arama terimi her değiştiğinde `onSearch`'i çağır
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
      {/* Arama Çubuğu */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange} // Her değişiklikte arama yapar
      />

      {/* Ana Kategori Seçimi */}
      <select value={mainCategory} onChange={handleMainCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Alt Kategori Seçimi */}
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

      {/* Sıralama Seçimi */}
      <select value={sortOption} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="popularity">Popularity</option>
      </select>

      {/* Filtreleri Uygula */}
      <button onClick={applyCategoryFilter}>Apply Filters</button>
    </div>
  );
};

export default ProductSearchFilter;
