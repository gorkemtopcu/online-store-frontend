import { Typography } from "antd";
import CartTable from "./components/CartTable";
import React from "react";
import useCartStore from "context/CartStore";
import CartEmpty from "./components/CartEmpty";
import CartCheckout from "./components/CartCheckout";

const { Title } = Typography;

const CartView = () => {
  const { getCartObjects } = useCartStore();

  return (
    <>
      <Title level={2} style={{ textAlign: "left" }}>
        My Cart
      </Title>
      {getCartObjects().length > 0 ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ flex: 3 }}>
            <CartTable />
          </div>
          <div style={{ flex: 1 }}>
            <CartCheckout />
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default CartView;
