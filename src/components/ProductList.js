import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    fetch('/dummy.txt')
      .then(response => response.text())
      .then(text => {
        console.log('Fetched text:', text);  
        const data = JSON.parse(text); 
        setProducts(data);  
        setIsLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false);  
      });
  }, []);

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => { //for sorting prices
      if (sortOption === 'price') {
        return a.price - b.price;
      } else if (sortOption === 'popularity') { //and also sorting popularity
        return b.popularity - a.popularity;
      }
      return 0;
    });

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
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
          </select>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
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
                    {product.quantityInStocks > 0 ? 'Add to Cart' : 'Out of Stock'} {/* eğer stokta değilse out of stock*/}
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
