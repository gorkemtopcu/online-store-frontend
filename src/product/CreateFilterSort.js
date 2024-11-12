import React, { useState } from 'react';
import categories from 'constants/categories'; 

const CreateFilterSort = ({ onFilterSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  // Ana kategori seçildiğinde alt kategorileri sıfırlama
  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = e.target.value;
    setMainCategory(selectedMainCategory);
    setSubCategory('');
  };

  // Arama ve filtreleme işlemi
  const handleFilterSort = () => {
    onFilterSort({ searchTerm, sortOption, mainCategory, subCategory });
  };

  return (
    <div className="product-filter-bar">
      {/* Arama çubuğu */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Ana kategori seçimi */}
      <select value={mainCategory} onChange={handleMainCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Alt kategori seçimi */}
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

      {/* Sıralama seçimi */}
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort By</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
      </select>

      {/* Filtreleme ve sıralama işlemi */}
      <button onClick={handleFilterSort}>Apply Filters</button>
    </div>
  );
};

export default CreateFilterSort;
