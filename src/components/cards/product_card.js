import React, { useState } from "react";
import { Card, Spin, Badge } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`);
  };

  // Calculate discounted price if discount exists
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    // Redirect to product details page when the card is clicked
    <Card
      hoverable
      style={{ width: "100%", height: "100%" }}
      onClick={handleCardClick} // Call the function directly here
      cover={
        <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white opacity-75 z-10">
              <Spin size="large" />
            </div>
          )}
          <img
            alt={product.name}
            src={product.imageURL}
            onLoad={handleImageLoad}
            style={{
              visibility: loading ? "hidden" : "visible",
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      }
    >
      <div style={{ position: "relative" }}>
        <Meta
          title={product.name}
          description={
            <div>
              {product.discount > 0 && (
                <div style={{ textDecoration: "line-through", color: "gray" }}>
                  ${product.price.toFixed(2)}
                  {product.discount > 0 && (
              <Badge
                count={`%${Math.round(product.discount)} OFF`}
                style={{
                  backgroundColor: "#5CB338",
                  color: "#fff",
                  fontWeight: "bold",
                  marginLeft: "8px",
                }}
              />
            )}
              </div>
              )}
              <div style={{ fontWeight: product.discount > 0 ? "bold" : "normal" }}>
                ${discountedPrice.toFixed(2)}
              </div>
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default ProductCard;
