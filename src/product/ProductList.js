import React, { useState } from "react";

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredProducts = products
    .filter(
      (product) =>
        (product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // for sorting prices
      if (sortOption === "price") {
        return a.price - b.price;
      } else if (sortOption === "popularity") {
        // and also sorting popularity
        return b.popularity - a.popularity;
      }
      return 0;
    });

  return (
    <div>
      <h1>Product Listing</h1>
      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort by</option>
        <option value="price">Price</option>
        <option value="popularity">Popularity</option>
      </select>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>ID: {product.id}</p>
              <p>Brand: {product.brand}</p>
              <p>{product.description}</p>
              <img
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
              />
              <p>Price: {product.price} USD</p>
              <p>In Stock: {product.stock}</p>
              <p>Popularity: {product.popularity}</p>
              <p>Warranty: {product.warrantyStatus}</p>
              <button disabled={product.stock === 0}>
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
