import React, { useState, useEffect } from "react";
import ProductSelect from "./components/ProductSelect";
import DiscountForm from "./components/DiscountForm";
import ProductTable from "./components/ProductTable";
import Message from "./components/Message";

const SetDiscountRate = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountRate, setDiscountRate] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [message]); // refetch products after applying/removing discounts

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/admin/products/getAll"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
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
        `http://localhost:8081/admin/products/applyDiscount/${selectedProduct.productId}?discount=${discountRate}`,
        { method: "PUT" }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          responseText || `HTTP error! status: ${response.status}`
        );
      }

      setMessage(responseText);
      fetchProducts();
    } catch (err) {
      setError(err.message || "An error occurred while applying the discount.");
    }
  };

  const handleRemoveDiscount = async () => {
    resetState();
    if (!selectedProduct) {
      setError("Please select a product to remove the discount.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/admin/products/applyDiscount/${selectedProduct.productId}?discount=0`,
        { method: "PUT" }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          responseText || `HTTP error! status: ${response.status}`
        );
      }

      setMessage(responseText);
      fetchProducts();
    } catch (err) {
      setError(err.message || "An error occurred while removing the discount.");
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Product Discounts</h2>

        {/* Product Select */}
        <ProductSelect
          products={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />

        {/* Discount Form */}
        <DiscountForm
          discountRate={discountRate}
          setDiscountRate={setDiscountRate}
          handleApplyDiscount={handleApplyDiscount}
          handleRemoveDiscount={handleRemoveDiscount}
          selectedProduct={selectedProduct}
        />

        {/* Product Table */}
        <ProductTable
          products={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />

        {/* Message Display */}
        <Message message={message} error={error} />
      </div>
    </div>
  );
};

export default SetDiscountRate;
