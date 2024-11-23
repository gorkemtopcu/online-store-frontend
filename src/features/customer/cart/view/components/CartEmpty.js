import { Button, Empty } from "antd";
import { CustomerRoutePaths } from "constants/route_paths";
import StringConstants from "constants/StringConstants";
import React from "react";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <Empty
      description={<span>Your cart is empty!</span>}
      style={{ marginTop: "50px" }}
    >
      <Button
        type="primary"
        size="large"
        onClick={() => navigate(CustomerRoutePaths.COLLECTION)}
      >
        {StringConstants.CONTINUE_SHOPPING}
      </Button>
    </Empty>
  );
};

export default CartEmpty;
