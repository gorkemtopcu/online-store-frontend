import { Button, Card, Typography } from "antd";
import AuthenticationModal from "components/modals/AuthenticationModal";
import { CustomerRoutePaths } from "constants/route_paths";
import useCartStore from "context/CartStore";
import useUserStore from "context/UserStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartCheckout = () => {
  const { getTotalPrice } = useCartStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const { Title } = Typography;

  const handleCheckout = () => {
    if (currentUser) {
      navigate(CustomerRoutePaths.PAYMENT);
    } else {
      setIsLoginVisible(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoginVisible(false);
    navigate(CustomerRoutePaths.PAYMENT);
  };

  const handleCloseModal = () => {
    setIsLoginVisible(false);
  };

  return (
    <>
      <Card>
        <Title level={4}>Total: ${getTotalPrice().toFixed(2)}</Title>
        <Button type="primary" size="large" block onClick={handleCheckout}>
          Checkout
        </Button>
      </Card>

      <AuthenticationModal
        isOpen={isLoginVisible}
        onClose={handleCloseModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default CartCheckout;
