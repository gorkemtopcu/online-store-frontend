import ProductCardList from "components/lists/product_card_list";
const React = require("react");

const CollectionProducts = ({ products }) => {
  return (
    <div className="px-6 py-10 mx-auto" style={{ maxWidth: "1200px" }}>
      <ProductCardList products={products} />
    </div>
  );
};

export default CollectionProducts;
