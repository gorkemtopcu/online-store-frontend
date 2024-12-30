// components/inputs/ProductPriceInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ProductionCostInput = () => (
  <Form.Item
    label={StringConstants.PRODUCTION_COST}
    name="productionCost"
    rules={[{ required: true, message: "Please input the production cost!" }]}
  >
    <Input type="number" />
  </Form.Item>
);

export default ProductionCostInput;
