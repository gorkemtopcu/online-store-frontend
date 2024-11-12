import React, { useState } from "react";

const ProductSearchFilter = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearchClick = () => {
    onSearch(searchTerm); // Butona basıldığında arama terimini gönder
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSort(option);
  };

  return (
    <div className="product-search-filter">
      <input
        type="text"
        placeholder="Search products by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Arama terimini güncelle
      />
      <button onClick={handleSearchClick}>Search</button> {/* Arama butonu */}
      <select onChange={handleSortChange} value={sortOption}>
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default ProductSearchFilter;
