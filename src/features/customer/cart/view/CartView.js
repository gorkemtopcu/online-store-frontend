import { Typography, Button, Card, Modal } from "antd";
import CartTable from "./components/CartTable";
import React,  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useCartStore from "context/CartStore";
import useUserStore from "context/UserStore";
import CartEmpty from "./components/CartEmpty";
import AuthenticationModal from "components/modals/AuthenticationModal";

const { Title } = Typography;

const CartView = () => {
  const { cart, getTotalPrice } = useCartStore();
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  console.log("CART: " + cart);

  // Calculate the total price using the store
  const totalPrice = cart ? getTotalPrice() : 0;

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate('/payment');
    } else {
      setIsLoginVisible(true); // Show the login screen if not logged in
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginVisible(false); // Hide the login screen
    navigate('/payment'); // Navigate to the payment page after successful login
  };

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
              <Button type="primary" size="large" block onClick={handleCheckout}>
                Checkout
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}

      <Modal
        visible={isLoginVisible}
        onCancel={() => setIsLoginVisible(false)}
        footer={null}
      >
        <AuthenticationModal isOpen={isLoginVisible} onClose={handleLoginSuccess} />
      </Modal>

    </>
  );
};

export default CartView;
