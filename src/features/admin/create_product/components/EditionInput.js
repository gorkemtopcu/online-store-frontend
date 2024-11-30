import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const EditionInput = () => (
  <Form.Item
    label={StringConstants.EDITION}
    name="edition"
    rules={[{ required: true, message: "Please input the edition!" }]}
  >
    <Input placeholder="e.g., 1st Edition, Revised Edition" />
  </Form.Item>
);

export default EditionInput;
