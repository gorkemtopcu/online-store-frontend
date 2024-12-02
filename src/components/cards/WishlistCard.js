import React, { useState } from "react";
import { Card, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom"; // For react-router v6
const { Meta } = Card;

const WishlistCard = ({ product, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.productId}`); // Navigates to the product details page
  };

  return (
    // Redirect to product details page when the card is clicked
    <div>
    <Card
      hoverable
      style={{ width: "100%" }}
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
      <Meta title={product.name} description={`$${product.price}`} />
      <br></br>
      
    </Card>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button type="primary" danger onClick={() => onRemove(product.wishlistId)}>
          Remove from Wishlist
        </Button>
      </div> 
    </div>
  );
};

export default WishlistCard;
