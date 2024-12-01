// components/inputs/ProductDescriptionInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const CategoryDescriptionInput = () => (
  <Form.Item
    label={StringConstants.CATEGORY_DESCRIPTION}
    name="description"
    rules={[{ required: true, message: "Please input the category description!" }]}
  >
    <Input.TextArea />
  </Form.Item>
);

export default CategoryDescriptionInput;
