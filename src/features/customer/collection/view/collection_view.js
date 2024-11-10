import CollectionProducts from "features/customer/collection/view/components/collection_products";
import React, { useEffect, useState } from "react";
import { productMockService } from "services/product_mock_service";

const CollectionView = () => {
  const [collectionProducts, setBestSellers] = useState([]);

  useEffect(() => {
    const generatedBestSellers = productMockService.generateProducts(52);
    setBestSellers(
      generatedBestSellers.sort((a, b) => b.popularity - a.popularity)
    );
  }, []);

  return (
    <div>
      <CollectionProducts products={collectionProducts} />
    </div>
  );
};

export default CollectionView;
