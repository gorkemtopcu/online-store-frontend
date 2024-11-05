import React, { useState, useEffect } from 'react';
import CreateFilterSort from './CreateFilterSort';
import categories from './categories';

const ProductList = ({ products: initialProducts = [] }) => { // products prop
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [isLoading, setIsLoading] = useState(!initialProducts.length); // Eğer initialProducts varsa isLoading false
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

  // Filtrelenmiş ve sıralanmış ürünleri almak için createFilterSort
  const filteredSortedProducts = CreateFilterSort(products, { searchTerm, sortOption, mainCategory, subCategory });

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

          {/* Ana kategori seçeneği */}
          <select onChange={(e) => setMainCategory(e.target.value)} value={mainCategory}>
            <option value="">All Main Categories</option>
            {categories.map(category => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Alt kategori seçeneği */}
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            disabled={!mainCategory} // Ana kategori seçilmediyse devre dışı bırak
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
                  <p>Name: {product.name}</p>
                  <p>Model: {product.model}</p>
                  <p>Serial Number: {product.serialNumber}</p>
                  <p>{product.description}</p>
                  <p>Price: {product.price} USD</p>
                  <p>In Stock: {product.quantityInStocks}</p>
                  <p>Warranty: {product.warrantyStatus}</p>
                  <p>Distributor: {product.distributor}</p>
                  <button disabled={product.quantityInStocks === 0}>
                    {product.quantityInStocks > 0 ? 'Add to Cart' : 'Out of Stock'}
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
