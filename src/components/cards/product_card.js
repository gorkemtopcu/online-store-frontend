import React, { useState } from "react";
import { Card, Spin, Button } from "antd";
const { Meta } = Card;

const ProductCard = ({ product, showButtons, onAddToCart, onRemoveFromWishlist }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white opacity-75 z-10">
              <Spin size="large" />
            </div>
          )}
          <img
            alt={product.name}
            src={product.image}
            onLoad={handleImageLoad}
            className="w-full h-full object-cover"
          />
        </div>
      }
    >
      <Meta title={product.name} description={`$${product.price}`} />
      
      {/* Conditionally render buttons if showButtons is true */}
      {showButtons && (
        <div className="flex justify-between mt-4">
          <Button type="primary" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
          <Button type="default" onClick={() => onRemoveFromWishlist(product.id)}>
            Remove from Wishlist
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
