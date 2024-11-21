import React, { useState, useEffect } from "react";
import Sidemenu from "components/sidemenu/sidemenu";
import CollectionProducts from "features/customer/collection/view/components/collection_products";
import { productMockService } from "services/product_mock_service";
import "./collection_view.css";

const CollectionView = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collectionProducts, setCollectionProducts] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Fetch mock products for collection view
    const generatedProducts = productMockService.generateProducts(52);
    setCollectionProducts(
      generatedProducts.sort((a, b) => b.popularity - a.popularity)
    );
  }, []);

  return (
    <div className="collection-view-container">
  <button
    className="filter-button"
    onClick={toggleMenu}
  >
    Filter
  </button>
  <Sidemenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
  <div className={`products-container ${isMenuOpen ? "menu-open" : ""}`}>
    <CollectionProducts products={collectionProducts} />
  </div>
</div>
  );
};

export default CollectionView;
