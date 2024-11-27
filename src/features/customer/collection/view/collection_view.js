import React, { useState, useEffect } from "react";
import FilterMenu from "features/customer/collection/view/components/FilterMenu";
import CollectionProducts from "features/customer/collection/view/components/collection_products";
import ProductService from "services/ProductService";
import "./collection_view.css";

const CollectionView = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll();
        if (response && response.data) {
          setCollectionProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryFilter = ({ mainCategory, subCategory }) => {
    const filtered = collectionProducts.filter((product) => {
      const matchesMainCategory = mainCategory
        ? product.category === mainCategory
        : true;
      const matchesSubCategory = subCategory
        ? product.subcategory === subCategory
        : true;
      return matchesMainCategory && matchesSubCategory;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="collection-view-container">
      <button className="menu-toggle-button" onClick={toggleMenu}>
        ☰
      </button>
      <FilterMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onCategoryFilter={handleCategoryFilter}
      />
      <div className={`content-container ${isMenuOpen ? "menu-open" : ""}`}>
        <CollectionProducts products={filteredProducts} />
      </div>
    </div>
  );
};

export default CollectionView;
