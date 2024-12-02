import React from "react";
import useProductDetails from "../hooks/ProductDetailsHook";
import LoadingSpinner from "components/spinner/LoadingSpinner";
import ProductContainer from "./components/ProductContainer";
import ReviewSection from "./components/ReviewSection";
import { Divider } from "antd";
import WishlistService from "services/WishlistService";
import useUserStore from "context/UserStore";

const ProductDetailsView = () => {
  const { product, checkProductAvailability, handleAddToCart, reviews } =
    useProductDetails();

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
      <ReviewSection reviews={reviews} />
    </div>
  );
};

export default ProductDetailsView;
