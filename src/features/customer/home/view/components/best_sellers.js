import ProductCardList from "components/lists/product_card_list";
import React, { useEffect, useState } from "react";
import ProductService from "services/ProductService";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getBestSellers();
      setBestSellers(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 py-10 mx-auto" style={{ maxWidth: "1200px" }}>
      <h1 className="text-3xl font-semibold text-center mb-4">Best Sellers</h1>
      <p className="text-center text-gray-600 mb-8">
        Check out our top-selling products that everyone is raving about!
      </p>

      <ProductCardList products={bestSellers} />
    </div>
  );
};

export default BestSellers;
