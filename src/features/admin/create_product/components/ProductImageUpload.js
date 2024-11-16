// components/inputs/ProductImageUpload.js
import React from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import StringConstants from "constants/StringConstants";

const ProductImageUpload = () => (
  <Form.Item
    label={StringConstants.PRODUCT_IMAGE}
    name="productImage"
    valuePropName="fileList"
    getValueFromEvent={(e) => e.fileList}
    rules={[{ required: false, message: "Please upload a product image!" }]}
  >
    <Upload
      listType="picture"
      beforeUpload={() => false} // Prevents auto-upload
      multiple={true}
      accept=".png,.jpeg,.jpg"
    >
      <Button icon={<UploadOutlined />}>{StringConstants.UPLOAD_IMAGE}</Button>
    </Upload>
  </Form.Item>
);

export default ProductImageUpload;
