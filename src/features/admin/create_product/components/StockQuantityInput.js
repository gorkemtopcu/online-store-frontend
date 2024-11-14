// components/inputs/StockQuantityInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const StockQuantityInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.QUANTITY}
    name="quantityInStock"
    rules={[{ required: true, message: "Please input the product in stock!" }]}
  >
    <Input type="number" value={value} onChange={onChange} />
  </Form.Item>
);

export default StockQuantityInput;
