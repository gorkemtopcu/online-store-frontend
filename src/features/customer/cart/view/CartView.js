import React, { useState, useEffect } from "react";
import { Typography, Button, Card, Empty } from "antd";
import { productMockService } from "services/mock/product_mock_service";
import CartTable from "./components/CartTable";

const { Title } = Typography;

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const products = productMockService.generateProducts(10).map((product) => ({
      ...product,
      quantity: 1,
    }));
    setCartItems(products);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  const handleQuantityChange = (value, productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: value || 1 } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "left" }}>
        My Cart
      </Title>
      {cartItems.length > 0 ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div style={{ flex: 3 }}>
            <CartTable
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Card>
              <Title level={4}>Total: ${totalPrice}</Title>
              <Button type="primary" size="large" block>
                Checkout
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <Empty
          description={<span>Your cart is empty!</span>}
          style={{ marginTop: "50px" }}
        >
          <Button type="primary" size="large">
            Continue Shopping
          </Button>
        </Empty>
      )}
    </>
  );
};

export default CartView;
