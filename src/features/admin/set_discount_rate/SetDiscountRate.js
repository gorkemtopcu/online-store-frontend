import React, { useState, useEffect } from "react";

const SetDiscountRate = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountRate, setDiscountRate] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [message]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/admin/products/getAll");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error fetching products.");
      setLoading(false);
    }
  };

  const resetState = () => {
    setMessage(null);
    setError(null);
  };

  const handleApplyDiscount = async () => {
    resetState();
    if (!selectedProduct || !discountRate) {
      setError("Please select a product and enter a discount rate.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/admin/products/applyDiscount/${selectedProduct}?discountPercentage=${discountRate}`,
        {
          method: 'PUT'
        }
      );

      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(responseText || `HTTP error! status: ${response.status}`);
      }

      setMessage(responseText || "Discount applied successfully.");
      setSelectedProduct(null);
      setDiscountRate("");
    } catch (err) {
      console.error("Error applying discount:", err);
      setError(err.message || "An error occurred while applying the discount.");
    }
  };

  const handleRemoveDiscount = async () => {
    resetState();
    if (!selectedProduct) {
      setError("Please select a product to remove discount.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/admin/products/removeDiscount/${selectedProduct}`,
        {
          method: 'PUT'
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || `HTTP error! status: ${response.status}`);
      }

      setMessage(responseText || "Discount removed successfully.");
      setSelectedProduct(null);
      setDiscountRate("");
    } catch (err) {
      console.error("Error removing discount:", err);
      setError(err.message || "An error occurred while removing the discount.");
    }
  };

  const hasDiscount = (product) => {
    return product.originalPrice > 0 && product.price < product.originalPrice;
  };

  const calculateDiscountPercentage = (product) => {
    if (product.originalPrice && product.price) {
      const percentage = ((product.originalPrice - product.price) / product.originalPrice * 100);
      return percentage.toFixed(1);
    }
    return 0;
  };

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Product Discounts</h2>

        <div className="mb-6 grid gap-4">
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
                  {hasDiscount(product) && ` (${calculateDiscountPercentage(product)}% OFF)`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage
            </label>
            <input
              id="discountRate"
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="Enter discount percentage"
              className="w-full p-2 border border-gray-300 rounded-md"
              min="0"
              max="100"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleApplyDiscount}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              disabled={!selectedProduct || !discountRate}
            >
              Apply Discount
            </button>
            <button
              onClick={handleRemoveDiscount}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              disabled={!selectedProduct}
            >
              Remove Discount
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">Current Price</th>
                <th className="p-3 text-left">Original Price</th>
                <th className="p-3 text-left">Discount Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr 
                  key={product.productId} 
                  className={`border-t border-gray-200 hover:bg-gray-50 transition-colors
                    ${selectedProduct === product.productId ? 'bg-blue-50 hover:bg-blue-100' : ''}`}
                  onClick={() => setSelectedProduct(product.productId)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">${product.price.toFixed(2)}</td>
                  <td className="p-3">
                    {product.originalPrice > 0 ? `$${product.originalPrice.toFixed(2)}` : '-'}
                  </td>
                  <td className="p-3">
                    <span 
                      className={`px-2 py-1 rounded-full text-sm 
                        ${hasDiscount(product) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {hasDiscount(product) ? 
                        `${calculateDiscountPercentage(product)}% OFF` : 
                        'No discount'
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {message && (
          <div className="mt-4 p-2 bg-green-50 text-green-600 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-2 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SetDiscountRate;