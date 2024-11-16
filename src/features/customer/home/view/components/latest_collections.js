import ProductCardList from "components/lists/product_card_list";
import React, { useEffect, useState } from "react";
import { productMockService } from "services/mock/product_mock_service";

const LatestCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const generatedCollections = productMockService.generateProducts(8);
    setCollections(generatedCollections);
  }, []);

  return (
    <div className="px-6 py-10 mx-auto" style={{ maxWidth: "1200px" }}>
      <h1 className="text-3xl font-semibold text-center mb-4">
        Latest Collections
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Explore our newest arrivals of clothing and accessories!
      </p>

      <ProductCardList products={collections} />
    </div>
  );
};

export default LatestCollections;
