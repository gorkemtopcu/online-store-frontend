import React from "react";
import ProductSearchFilter from "features/customer/collection/view/components/ProductSearchFilter";
import CollectionProductList from "./components/CollectionProductList";
import useProductsQuery, { PRODUCT_STATES } from "../hooks/ProductsQueryHook";
import ErrorCard from "components/cards/ErrorCard";

const CollectionView = () => {
  const {
    filteredProducts,
    state,
    setSearchTerm,
    setSortOption,
    setFilters,
    sortOption,
    retry,
  } = useProductsQuery();

  return (
    <div>
      <ProductSearchFilter
        onSearch={setSearchTerm}
        onSort={setSortOption}
        setFilters={setFilters}
        sortOption={sortOption}
      />
      {state === PRODUCT_STATES.ERROR ? (
        <ErrorCard
          title="Failed to fetch products"
          subtitle="An error occurred while fetching products. Please try again later."
          onRetry={retry}
        />
      ) : (
        <CollectionProductList
          products={filteredProducts}
          isLoading={state === PRODUCT_STATES.LOADING}
        />
      )}
    </div>
  );
};

export default CollectionView;
