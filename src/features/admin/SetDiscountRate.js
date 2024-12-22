import React, { useState, useEffect } from "react";
import { InputNumber, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const SetDiscountRate = () => {
  const [products, setProducts] = useState([]); 
  const [productId, setProductId] = useState(null);
  const [discountRate, setDiscountRate] = useState(0); 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin/products/getAll"); 
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data); 
          message.success("Products fetched successfully!");
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error); // Log error for debugging
        message.error("Failed to fetch products. Please check the backend.");
      }
    };

    fetchProducts(); 
  }, []);


  const handleApplyDiscount = async () => {
    if (!productId) {
      message.error("Please select a product!");
      return;
    }

    if (discountRate < 0 || discountRate > 100) {
      message.error("Discount rate must be between 0 and 100!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/admin/products/${productId}/applyDiscount`,
        null,
        { params: { discountRate } } 
      );
      message.success(response.data); 
    } catch (error) {
      console.error("Error applying discount:", error); // Log error for debugging
      message.error(error.response?.data || "Failed to apply discount");
    }
  };

  return (
    <div>
      <h2>Set Discount Rate</h2>

      {/* Dropdown for selecting a product */}
      <Select
        placeholder="Select a product"
        style={{ width: 300, marginBottom: 10 }}
        onChange={(value) => setProductId(value)}
      >
        {products.map((product) => (
          <Option key={product.productId} value={product.productId}>
            {product.name}
          </Option>
        ))}
      </Select>
      <br />

      {/* Input for entering discount rate */}
      <InputNumber
        min={0}
        max={100}
        placeholder="Discount Rate (%)"
        style={{ width: 300, marginBottom: 10 }}
        onChange={(value) => setDiscountRate(value)}
      />
      <br />

      {/* Button to apply discount */}
      <Button type="primary" onClick={handleApplyDiscount}>
        Apply Discount
      </Button>
    </div>
  );
};

export default SetDiscountRate;
