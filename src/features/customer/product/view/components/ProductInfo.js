import React from "react";

const ProductInfo = ({
  name,
  brand,
  description,
  warrantyStatus,
  quantityInStock,
  price,
}) => (
  <>
    <h1 className="text-2xl font-bold text-center">{name}</h1>
    <p className="text-center">
      {brand}
      <br />
      <br />
    </p>
    <p>
      <strong>Description:</strong> {description}
    </p>
    <p>
      <strong>Warranty Status:</strong> {warrantyStatus} <br />
      <br />
    </p>
    <p>
      <strong>Stock:</strong> {quantityInStock} available
    </p>
    <p className="text-xl">
      <strong>${price}</strong>{" "}
    </p>
  </>
);

export default ProductInfo;
