import React from "react";
import { Card, Typography, Button } from "antd";
import DateFormat from "utils/DateFormat";

const { Paragraph, Text } = Typography;

const ProductTitle = ({ name }) => (
  <Text
    style={{
      textAlign: "left",
      fontSize: "26px",
      fontWeight: "bold",
      display: "block",
    }}
  >
    {name}
  </Text>
);

const AuthorPublisherRow = ({ author, publisher }) => (
  <div
    style={{
      display: "flex",
      gap: "12px",
      marginBottom: "8px",
    }}
  >
    <Text type="secondary">
      <Text type="secondary" strong>
        Author:
      </Text>{" "}
      {author}
    </Text>
    <Text type="secondary">
      <Text type="secondary" strong>
        Publisher:
      </Text>{" "}
      {publisher}
    </Text>
  </div>
);

const Price = ({ price }) => (
  <Text
    style={{
      textAlign: "left",
      marginBottom: "5px",
      fontSize: "34px",
      fontWeight: "bold",
      display: "block",
    }}
  >
    ${price}
  </Text>
);

const AddToCartButton = ({ handleAddToCart, isProductAvailable }) => (
  <Button
    block
    type="primary"
    size="large"
    style={{ marginBottom: "20px" }}
    onClick={handleAddToCart}
    disabled={!isProductAvailable}
  >
    Add to Cart
  </Button>
);

const ProductDetails = ({
  warrantyStatus,
  quantityInStock,
  isbn,
  language,
  numberOfPages,
  publicationDate,
  edition,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px 16px",
      marginTop: "16px",
      textAlign: "left",
    }}
  >
    <Text>
      <Text strong>ISBN:</Text> {isbn}
    </Text>
    <Text>
      <Text strong>Language:</Text> {language}
    </Text>
    <Text>
      <Text strong>Number of Pages:</Text> {numberOfPages}
    </Text>
    <Text>
      <Text strong>Publication Date:</Text>{" "}
      {DateFormat.formatToShortDate(publicationDate)}
    </Text>
    <Text>
      <Text strong>Edition:</Text> {edition}
    </Text>
    <Text>
      <Text strong>Warranty Status:</Text> {warrantyStatus}
    </Text>
    <Text>
      <Text strong>Stock:</Text> {quantityInStock} available
    </Text>
  </div>
);

// Parent Component
const ProductCard = ({
  name,
  description,
  warrantyStatus,
  quantityInStock,
  price,
  handleAddToCart,
  isProductAvailable,
  author,
  publisher,
  isbn,
  language,
  numberOfPages,
  publicationDate,
  edition,
}) => (
  <Card
    style={{
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <ProductTitle name={name} />
    <AuthorPublisherRow author={author} publisher={publisher} />
    <Price price={price} />
    <AddToCartButton
      handleAddToCart={handleAddToCart}
      isProductAvailable={isProductAvailable}
    />
    <Paragraph style={{ textAlign: "left" }}>
      <Text strong>Description:</Text> {description}
    </Paragraph>
    <ProductDetails
      warrantyStatus={warrantyStatus}
      quantityInStock={quantityInStock}
      isbn={isbn}
      language={language}
      numberOfPages={numberOfPages}
      publicationDate={publicationDate}
      edition={edition}
    />
  </Card>
);

export default ProductCard;
