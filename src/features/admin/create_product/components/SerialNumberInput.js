// components/inputs/SerialNumberInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const SerialNumberInput = () => (
  <Form.Item
    label={StringConstants.SERIAL_NUMBER}
    name="serialNumber"
    rules={[{ required: true, message: "Please input the serial number!" }]}
  >
    <Input />
  </Form.Item>
);

export default SerialNumberInput;
