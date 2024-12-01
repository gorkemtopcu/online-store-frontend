import React, { useState } from "react";
import { Form, Button, message, Row, Col } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import StringConstants from "constants/StringConstants";
import ProductService from "services/ProductService";
import CreateProductFormConfig from "../config/CreateProductFormConfig ";

const CreateProductPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file.originFileObj));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await ProductService.addProduct(formData);
      message.success("Product created successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Error creating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <ProductHeader title={StringConstants.CREATE_PRODUCT} />
        <Form
          form={form}
          name="create_product"
          onFinish={onFinish}
          layout="vertical"
        >
          {CreateProductFormConfig.map((row, index) => (
            <Row gutter={16} key={index}>
              {row.components.map((Component, colIndex) => (
                <Col span={24 / row.components.length} key={colIndex}>
                  {Component}
                </Col>
              ))}
            </Row>
          ))}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={loading}
            >
              {StringConstants.SUBMIT}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProductPage;
