import React from "react";
import useProductDetails from "../hooks/ProductDetailsHook";
import LoadingSpinner from "components/spinner/LoadingSpinner";
import ProductContainer from "./components/ProductContainer";
import ReviewSection from "./components/ReviewSection";
import { Divider } from "antd";

const ProductDetailsView = () => {
  const {
    product,
    checkProductAvailability,
    handleAddToCart,
    allReviews,
    approvedReviews,
  } = useProductDetails();

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <div
      style={{
        marginTop: "40px",
        gap: "40px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductContainer
        product={product}
        checkProductAvailability={checkProductAvailability}
        handleAddToCart={handleAddToCart}
      />
      <Divider />
      <ReviewSection
        allReviews={allReviews}
        approvedReviews={approvedReviews}
      />
    </div>
  );
};

export default ProductDetailsView;
