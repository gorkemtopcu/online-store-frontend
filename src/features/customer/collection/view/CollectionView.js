import React from "react";
import ProductSearchFilter from "features/customer/collection/view/components/ProductSearchFilter";
import CollectionProductList from "./components/CollectionProductList";
import useProductsQuery, { PRODUCT_STATES } from "../hooks/ProductsQueryHook";

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
      <CollectionProductList
        products={filteredProducts}
        isLoading={state === PRODUCT_STATES.LOADING}
        hasError={state === PRODUCT_STATES.ERROR}
        retry={retry}
      />
    </div>
  );
};

export default CollectionView;
