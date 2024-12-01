import React from "react";
import { Form, DatePicker } from "antd";
import StringConstants from "constants/StringConstants";

const PublicationDateInput = () => (
  <Form.Item
    label={StringConstants.PUBLICATION_DATE}
    name="publicationDate"
    rules={[{ required: true, message: "Please select the publication date!" }]}
  >
    <DatePicker style={{ width: "100%" }} />
  </Form.Item>
);

export default PublicationDateInput;
