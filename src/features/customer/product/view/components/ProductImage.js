import React from "react";

const ProductImage = ({ imageURL, name }) => (
  <img
    alt={name}
    src={imageURL}
    style={{
      width: "100%",
      borderRadius: "8px",
      objectFit: "contain",
    }}
  />
);

export default ProductImage;
