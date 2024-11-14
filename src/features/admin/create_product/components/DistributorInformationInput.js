// components/inputs/DistributorInformationInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const DistributorInformationInput = () => (
  <Form.Item
    label={StringConstants.DISTRIBUTOR_INFORMATION}
    name="distributorInformation"
    rules={[{ required: true, message: "Please input the distributor information!" }]}
  >
    <Input />
  </Form.Item>
);

export default DistributorInformationInput;
