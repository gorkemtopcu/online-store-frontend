import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const PublisherInput = () => (
  <Form.Item
    label={StringConstants.PUBLISHER}
    name="publisher"
    rules={[{ required: true, message: "Please input the publisher!" }]}
  >
    <Input />
  </Form.Item>
);

export default PublisherInput;
