import React from "react";
import { Form, InputNumber } from "antd";
import StringConstants from "constants/StringConstants";

const NumberOfPagesInput = () => (
  <Form.Item
    label={StringConstants.NUMBER_OF_PAGES}
    name="numberOfPages"
    rules={[
      { required: true, message: "Please input the number of pages!" },
      { type: "number", min: 1, message: "Number of pages must be greater than 0!" },
    ]}
  >
    <InputNumber style={{ width: "100%" }} />
  </Form.Item>
);

export default NumberOfPagesInput;
