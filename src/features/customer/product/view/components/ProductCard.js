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

const Price = ({ price, discount }) => {
  // Calculate discounted price
  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div style={{ textAlign: "left", marginBottom: "5px" }}>
      {discount > 0 && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Text
            style={{
              textDecoration: "line-through",
              color: "gray",
              fontSize: "18px",
              marginRight: "10px",
            }}
          >
            ${price.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#5CB338",
            }}
          >
            {`(%${Math.round(discount)} OFF)`}
          </Text>
        </div>
      )}
      <Text
        style={{
          fontSize: "34px",
          fontWeight: "bold",
          color: discount > 0 ? "#5CB338" : "inherit",
          marginTop: discount > 0 ? "5px" : "0",
        }}
      >
        ${discountedPrice.toFixed(2)}
      </Text>
    </div>
  );
};



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
  numOfWishlist,
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
    <Text>
      <Text strong>Number of Wishlists:</Text> {numOfWishlist}
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
  numOfWishlist,
  discount
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
    <Price price={price} discount={discount} />
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
      numOfWishlist={numOfWishlist}
    />
  </Card>
);

export default ProductCard;
