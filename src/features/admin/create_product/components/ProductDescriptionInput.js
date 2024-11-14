// components/inputs/ProductDescriptionInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ProductDescriptionInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.PRODUCT_DESCRIPTION}
    name="productDescription"
    rules={[{ required: true, message: "Please input the product description!" }]}
  >
    <Input.TextArea value={value} onChange={onChange} />
  </Form.Item>
);

export default ProductDescriptionInput;
