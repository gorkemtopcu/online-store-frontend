// components/inputs/ProductPriceInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ProductPriceInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.PRODUCT_PRICE}
    name="productPrice"
    rules={[{ required: true, message: "Please input the product price!" }]}
  >
    <Input type="number" value={value} onChange={onChange} />
  </Form.Item>
);

export default ProductPriceInput;
