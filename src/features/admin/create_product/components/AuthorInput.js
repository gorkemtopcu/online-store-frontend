import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const AuthorInput = () => (
  <Form.Item
    label={StringConstants.AUTHOR}
    name="author"
    rules={[{ required: true, message: "Please input the author!" }]}
  >
    <Input />
  </Form.Item>
);

export default AuthorInput;
