// components/inputs/ProductDescriptionInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ProductDescriptionInput = () => (
  <Form.Item
    label={StringConstants.PRODUCT_DESCRIPTION}
    name="productDescription"
    rules={[{ required: true, message: "Please input the product description!" }]}
  >
    <Input.TextArea />
  </Form.Item>
);

export default ProductDescriptionInput;
