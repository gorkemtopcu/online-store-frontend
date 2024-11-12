import React, { useEffect, useState } from "react";
import CollectionProducts from "features/customer/collection/view/components/collection_products";
import ProductSearchFilter from "product/ProductSearchFilter";
import { productMockService } from "services/product_mock_service";

const CollectionView = () => {
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const generatedProducts = productMockService.generateProducts(52);
    setCollectionProducts(generatedProducts);
    setFilteredProducts(generatedProducts);
  }, []);

  const handleSearch = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = collectionProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedTerm) ||
        product.description.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (option) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (option === "price") {
        return a.price - b.price;
      } else if (option === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });
    setFilteredProducts(sorted);
  };

  return (
    <div>
      <ProductSearchFilter onSearch={handleSearch} onSort={handleSort} />
      <CollectionProducts products={filteredProducts} />
    </div>
  );
};

export default CollectionView;
