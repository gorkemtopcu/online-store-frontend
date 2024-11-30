import React from "react";
import { Form, Select } from "antd";
import StringConstants from "constants/StringConstants";

const { Option } = Select;

const LanguageInput = () => (
  <Form.Item
    label={StringConstants.LANGUAGE}
    name="language"
    rules={[{ required: true, message: "Please select the language!" }]}
  >
    <Select placeholder="Select Language">
      <Option value="English">English</Option>
      <Option value="Turkish">Turkish</Option>
      <Option value="Spanish">Spanish</Option>
      <Option value="French">French</Option>
      <Option value="German">German</Option>
      <Option value="Chinese">Chinese</Option>
      <Option value="Japanese">Japanese</Option>
    </Select>
  </Form.Item>
);

export default LanguageInput;
