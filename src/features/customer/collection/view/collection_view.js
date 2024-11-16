import React, { useEffect, useState } from "react";
import CollectionProducts from "features/customer/collection/view/components/collection_products";
import ProductSearchFilter from "features/customer/collection/view/components/ProductSearchFilter";
import ProductService from "api/ProductService";

const CollectionView = () => {
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products from ProductService instead of using mock data
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll();
        if (response && response.data) {
          console.log("Fetched products:", response.data);
          setCollectionProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
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

  const handleCategoryFilter = ({ mainCategory, subCategory }) => {
    const filtered = collectionProducts.filter((product) => {
      const matchesMainCategory = mainCategory ? product.category === mainCategory : true;
      const matchesSubCategory = subCategory ? product.subcategory === subCategory : true;
      return matchesMainCategory && matchesSubCategory;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <ProductSearchFilter
        onSearch={handleSearch}
        onSort={handleSort}
        onCategoryFilter={handleCategoryFilter}
      />
      <CollectionProducts products={filteredProducts} />
    </div>
  );
};

export default CollectionView;
