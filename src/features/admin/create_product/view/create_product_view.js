import React, { useState } from "react";
import { Form, Button, message } from "antd";
import ProductHeader from "components/headers/ProductHeader";
import StringConstants from "constants/StringConstants";

import ProductNameInput from "../components/ProductNameInput";
import ProductDescriptionInput from "../components/ProductDescriptionInput";
import ProductPriceInput from "../components/ProductPriceInput";
import DistributorInformationInput from "../components/DistributorInformationInput";
import ModelNumberInput from "../components/ModelNumberInput";
import StockQuantityInput from "../components/StockQuantityInput";
import SerialNumberInput from "../components/SerialNumberInput";
import ProductImageUpload from "../components/ProductImageUpload";
import WarrantyStatusInput from "../components/WarrantyStatusInput";
import ProductService from "services/ProductService";

const CreateProductPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // Create FormData payload
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("model", values.modelNumber);
    formData.append("serialNumber", values.serialNumber);
    formData.append("description", values.productDescription);
    formData.append("quantityInStock", values.quantityInStock);
    formData.append("price", values.productPrice);
    formData.append("warrantyStatus", values.warrantyStatus);
    formData.append("distributorInformation", values.distributorInformation);

    // Append images to FormData if they exist
    if (values.productImage) {
      values.productImage.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    }

    try {
      // Call the ProductService to add the product with FormData
      const response = await ProductService.addProduct(formData); // Adjust ProductService to accept FormData
      message.success("Product created successfully!");
      console.log("Response:", response);

      // Reset form fields after success
      form.resetFields();
    } catch (error) {
      message.error("Error creating product. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <ProductHeader title={StringConstants.CREATE_PRODUCT} />
        <Form
          form={form}
          name="create_product"
          onFinish={onFinish}
          layout="vertical"
        >
          <ProductNameInput />
          <ProductDescriptionInput />
          <ProductPriceInput />
          <DistributorInformationInput />
          <ModelNumberInput />
          <StockQuantityInput />
          <SerialNumberInput />
          <WarrantyStatusInput />
          <ProductImageUpload />
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
