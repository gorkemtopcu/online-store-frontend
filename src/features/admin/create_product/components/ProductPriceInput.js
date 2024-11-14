// components/inputs/ProductPriceInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ProductPriceInput = () => (
  <Form.Item
    label={StringConstants.PRODUCT_PRICE}
    name="productPrice"
    rules={[{ required: true, message: "Please input the product price!" }]}
  >
    <Input type="number" />
  </Form.Item>
);

export default ProductPriceInput;
