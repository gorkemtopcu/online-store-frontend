// components/inputs/ProductNameInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ProductNameInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.PRODUCT_NAME}
    name="name"
    rules={[{ required: true, message: "Please input the product name!" }]}
  >
    <Input value={value} onChange={onChange} />
  </Form.Item>
);

export default ProductNameInput;
