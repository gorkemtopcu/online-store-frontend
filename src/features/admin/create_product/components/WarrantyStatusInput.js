// components/inputs/WarrantyStatusInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const WarrantyStatusInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.WARRANTY_STATUS}
    name="warrantyStatus"
    rules={[{ required: true, message: "Please input the warranty status!" }]}
  >
    <Input value={value} onChange={onChange} placeholder="Enter warranty status" />
  </Form.Item>
);

export default WarrantyStatusInput;
