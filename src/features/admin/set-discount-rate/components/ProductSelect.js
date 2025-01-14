import React, { useState, useEffect } from "react";
import { Select } from "antd";

const ProductSelect = ({ products, selectedProduct, setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  // Function to handle selection of a product
  const handleSelect = (value) => {
    const selected = products.find((product) => product.productId === value);
    setSelectedProduct(selected);
    setSearchTerm(selected ? selected.name : ""); // Update input box with the selected product name
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <label
        htmlFor="productSelect"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Product
      </label>

      <Select
        showSearch
        value={selectedProduct ? selectedProduct.productId : undefined}
        onChange={handleSelect}
        onSearch={setSearchTerm} // Update search term while typing
        style={{ width: "100%" }}
        placeholder="Select a product"
        filterOption={false} // Disable the default filter to use the custom search
        optionLabelProp="label"
        options={filteredProducts.map((product) => ({
          value: product.productId,
          label: `${product.name} - $${product.price.toFixed(2)}`,
        }))}
      />
    </div>
  );
};

export default ProductSelect;
