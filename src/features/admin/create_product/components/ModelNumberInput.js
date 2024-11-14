// components/inputs/ModelNumberInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ModelNumberInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.MODEL_NUMBER}
    name="modelNumber"
    rules={[{ required: true, message: "Please input the model number!" }]}
  >
    <Input value={value} onChange={onChange} />
  </Form.Item>
);

export default ModelNumberInput;
