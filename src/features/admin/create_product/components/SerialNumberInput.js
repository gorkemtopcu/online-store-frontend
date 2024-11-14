// components/inputs/SerialNumberInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const SerialNumberInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.SERIAL_NUMBER}
    name="serialNumber"
    rules={[{ required: true, message: "Please input the serial number!" }]}
  >
    <Input value={value} onChange={onChange} />
  </Form.Item>
);

export default SerialNumberInput;
