import { Col, Row } from "antd";
import React from "react";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";

const ProductContainer = ({
  product,
  checkProductAvailability,
  handleAddToCart,
}) => (
  <Row gutter={[16, 16]} justify="center" align="top">
    {/* Left column for product image */}
    <Col xs={24} md={10}>
      <ProductImage
        imageURLs={product.imageURL}
        productId={product.productId}
      />
    </Col>

    {/* Right column for product details */}
    <Col xs={24} md={14}>
      <ProductCard
        name={product.name}
        publisher={product.publisher}
        author={product.author}
        description={product.description}
        warrantyStatus={product.warrantyStatus}
        quantityInStock={product.quantityInStock}
        price={product.price}
        handleAddToCart={handleAddToCart}
        isProductAvailable={checkProductAvailability()}
        isbn={product.isbn}
        language={product.language}
        numberOfPages={product.numberOfPages}
        publicationDate={product.publicationDate}
        edition={product.edition}
        numOfWishlist={product.numOfWishlists}
        discount={product.discount}
      />
    </Col>
  </Row>
);

export default ProductContainer;
