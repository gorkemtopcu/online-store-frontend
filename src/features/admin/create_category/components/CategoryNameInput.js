// components/inputs/ProductNameInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const CategoryNameInput = () => (
  <Form.Item
    label={StringConstants.CATEGORY_NAME}
    name="name"
    rules={[{ required: true, message: "Please input the category name!" }]}
  >
    <Input />
  </Form.Item>
);

export default CategoryNameInput;
