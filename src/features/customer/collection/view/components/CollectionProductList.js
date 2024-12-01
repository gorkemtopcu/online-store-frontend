import { Empty } from "antd";
import ProductCardList from "components/lists/product_card_list";
import LoadingSpinner from "components/spinner/LoadingSpinner";
const React = require("react");

const CollectionProductList = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        description={<span>No product is found!</span>}
        style={{ marginTop: "50px" }}
      ></Empty>
    );
  }

  return (
    <div className="px-6 py-10 mx-auto" style={{ maxWidth: "1200px" }}>
      <ProductCardList products={products} />
    </div>
  );
};

export default CollectionProductList;
