import React from "react";

const ProductSelect = ({ products, selectedProduct, setSelectedProduct }) => {
  return (
    <div>
      <label htmlFor="productSelect" className="block text-sm font-medium text-gray-700 mb-2">
        Select Product
      </label>
      <select
        id="productSelect"
        value={selectedProduct || ''}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.productId} value={product.productId}>
            {product.name} - Current Price: ${product.price.toFixed(2)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelect;
