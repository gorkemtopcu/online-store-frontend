import React, { memo } from "react";
import { Empty } from "antd";
import LoadingSpinner from "components/spinner/LoadingSpinner";
import ProductCardList from "components/lists/product_card_list";
import ErrorCard from "components/cards/ErrorCard";

const CollectionProductList = ({ products, isLoading, hasError, retry }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <ErrorCard
        title="Failed to fetch products"
        subtitle="An error occurred while fetching products. Please try again later."
        onRetry={retry}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        description={<span>No product is found!</span>}
        style={{ marginTop: "50px" }}
      />
    );
  }

  return (
    <div className="px-6 py-10 mx-auto" style={{ maxWidth: "1200px" }}>
      <ProductCardList products={products} />
    </div>
  );
};

export default memo(CollectionProductList);
