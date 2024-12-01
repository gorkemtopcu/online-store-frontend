import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const ISBNInput = () => (
  <Form.Item
    label={StringConstants.ISBN}
    name="isbn"
    rules={[
      { required: true, message: "Please input the ISBN!" },
      { pattern: /^[0-9]{10,13}$/, message: "Please enter a valid ISBN (10 or 13 digits)!" },
    ]}
  >
    <Input />
  </Form.Item>
);

export default ISBNInput;
