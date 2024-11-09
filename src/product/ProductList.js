import React, { useState, useEffect } from 'react'; 
import createFilterSort from './CreateFilterSort';
import categories from './categories';

const ProductList = ({ products: initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [isLoading, setIsLoading] = useState(!initialProducts.length);

  useEffect(() => {
    if (!initialProducts.length) { 
      fetch('/dummy.txt')
        .then(response => response.text())
        .then(text => {
          const data = JSON.parse(text);
          setProducts(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setIsLoading(false);
        });
    }
  }, [initialProducts]);

  const filteredSortedProducts = createFilterSort(products, { searchTerm, sortOption, mainCategory, subCategory });

  return (
    <div>
      <h1>Product Listing</h1>

      {isLoading ? (
        <p>Loading Products...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>

          <select onChange={(e) => setMainCategory(e.target.value)} value={mainCategory}>
            <option value="">All Main Categories</option>
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            disabled={!mainCategory}
          >
            <option value="">All Subcategories</option>
            {mainCategory &&
              categories
                .find(category => category.name === mainCategory)
                ?.subcategories.map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
          </select>

          <div className="product-grid">
            {filteredSortedProducts.length > 0 ? (
              filteredSortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <h2>{product.name}</h2>
                  <p>ID: {product.id}</p>
                  <p>Brand: {product.brand}</p>
                  <img src={product.image} alt={product.name} width={100} height={100} />
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price} USD</p>
                  <p>In Stock: {product.stock}</p>
                  <p>Popularity: {product.popularity}</p>
                  <p>Warranty: {product.warrantyStatus}</p>
                  <button disabled={product.stock === 0}>
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;