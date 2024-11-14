// components/inputs/StockQuantityInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const StockQuantityInput = () => (
  <Form.Item
    label={StringConstants.QUANTITY}
    name="quantityInStock"
    rules={[{ required: true, message: "Please input the product in stock!" }]}
  >
    <Input type="number" />
  </Form.Item>
);

export default StockQuantityInput;
