import React, { useState } from 'react';

const ProductSearchFilter = ({ onSearch, onSort }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        onSort(e.target.value);
    };

    return (
        <div className="product-search-filter">
            <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select onChange={handleSortChange} value={sortOption}>
                <option value="">Sort By</option>
                <option value="price">Price</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    );
};

export default ProductSearchFilter;
