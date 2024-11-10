import React from "react";
import { Row, Col } from "antd";
import ProductCard from "components/cards/product_card";

const ProductCardList = ({ products }) => {
  return (
    <Row gutter={[12, 16]} justify="center">
      {products.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={item.id}>
          <ProductCard product={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductCardList;
