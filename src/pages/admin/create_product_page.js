import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import { UploadOutlined } from "@ant-design/icons";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [productImage, setProductImage] = useState(null);

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setProductImage(info.file.originFileObj);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <ProductHeader title="Create Product" />
        <Form
          name="create_product"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Product Description"
            name="productDescription"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <Input
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Product Price"
            name="productPrice"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="productImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              { required: true, message: "Please upload a product image!" },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevents auto-upload
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProductPage;
