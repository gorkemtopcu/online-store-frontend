import React, { useState } from "react";
import MainImage from "./MainImage";
import WishlistButton from "components/buttons/WishlistButton";
import ThumbnailList from "./ThumbnailList";

const ProductImage = ({ imageURLs, name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleNavigate = (direction) => {
    setCurrentImageIndex((prev) => {
      if (direction === "left") {
        return (prev - 1 + imageURLs.length) % imageURLs.length;
      }
      return (prev + 1) % imageURLs.length;
    });
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div style={{ position: "relative", maxWidth: "300px", margin: "0 auto" }}>
      <MainImage
        imageURL={imageURLs[currentImageIndex]}
        name={name}
        onNavigate={handleNavigate}
      />
      <WishlistButton
        isWishlisted={isWishlisted}
        toggleWishlist={toggleWishlist}
      />
      <ThumbnailList
        imageURLs={imageURLs}
        currentImageIndex={currentImageIndex}
        onThumbnailClick={handleThumbnailClick}
      />
    </div>
  );
};

export default ProductImage;
