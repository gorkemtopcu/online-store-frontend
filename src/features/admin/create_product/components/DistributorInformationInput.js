// components/inputs/DistributorInformationInput.js
import React from "react";
import { Form, Input } from "antd";
import StringConstants from "constants/StringConstants";

const DistributorInformationInput = ({ value, onChange }) => (
  <Form.Item
    label={StringConstants.DISTRIBUTOR_INFORMATION}
    name="distributorInformation"
    rules={[{ required: true, message: "Please input the distributor information!" }]}
  >
    <Input value={value} onChange={onChange} />
  </Form.Item>
);

export default DistributorInformationInput;
