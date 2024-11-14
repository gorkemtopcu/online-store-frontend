import React, { useState } from "react";
import { Form, Button } from "antd";
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

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [distributorInformation, setDistributorInformation] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [warrantyStatus, setWarrantyStatus] = useState("");
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
    <div style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <ProductHeader title={StringConstants.CREATE_PRODUCT} />
        <Form
          name="create_product"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <ProductNameInput value={productName} onChange={(e) => setProductName(e.target.value)} />
          <ProductDescriptionInput value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
          <ProductPriceInput value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <DistributorInformationInput value={distributorInformation} onChange={(e) => setDistributorInformation(e.target.value)} />
          <ModelNumberInput value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} />
          <StockQuantityInput value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
          <SerialNumberInput value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
          <WarrantyStatusInput value={warrantyStatus} onChange={(e) => setWarrantyStatus(e.target.value)} />
          <ProductImageUpload onChange={handleImageChange} />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {StringConstants.SUBMIT}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateProductPage;
