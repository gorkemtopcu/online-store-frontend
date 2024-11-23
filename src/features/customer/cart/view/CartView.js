import { Typography, Button, Card } from "antd";
import CartTable from "./components/CartTable";
import React from "react";
import useCartStore from "context/CartStore";
import CartEmpty from "./components/CartEmpty";

const { Title } = Typography;

const CartView = () => {
  const { cart, getTotalPrice } = useCartStore();
  console.log("CART: " + cart);

  // Calculate the total price using the store
  const totalPrice = cart ? getTotalPrice() : 0;

  return (
    <>
      <Title level={2} style={{ textAlign: "left" }}>
        My Cart
      </Title>
      {Object.keys(cart || {}).length > 0 ? ( // Use empty object as fallback
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ flex: 3 }}>
            <CartTable />
          </div>
          <div style={{ flex: 1 }}>
            <Card>
              <Title level={4}>Total: ${totalPrice.toFixed(2)}</Title>
              <Button type="primary" size="large" block>
                Checkout
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default CartView;
