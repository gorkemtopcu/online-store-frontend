import React from "react";
import { Row, Divider, Typography, Form, notification } from "antd";
import Checkout from "./components/Checkout";
import useCartStore from "context/CartStore";
import useUserStore from "context/UserStore";
import PaymentColumn from "./components/PaymentColumn";
import AddressColumn from "./components/AddressColumn";
import { useNavigate } from "react-router-dom";
import OrderService from "services/OrderService";
import { CustomerRoutePaths } from "constants/route_paths";
const { Text } = Typography;

const CheckoutView = () => {
  const { clearCart, getCartObjects, getTotalPrice } = useCartStore();
  const selectedProducts = getCartObjects();
  const [addressForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const proceedToPayment = () => {
    addressForm
      .validateFields()
      .then(() => {
        console.log("Address form is valid");
        paymentForm
          .validateFields()
          .then(() => {
            console.log("Payment form is valid");
            handleOnPurchase();
          })
          .catch((errorInfo) => {
            console.error("Payment form validation failed:", errorInfo);
          });
      })
      .catch((errorInfo) => {
        console.error("Address form validation failed:", errorInfo);
      });
  };

  const handleOnPurchase = () => {
    const addressDetails = addressForm.getFieldsValue();
    const paymentDetails = paymentForm.getFieldsValue();
    const orderTotal = getTotalPrice().toFixed(2);
    // get the product ids and quantities from the selected products
    const selectedProductsData = selectedProducts.map((item) => ({
      productId: item.product?.productId || null,
      quantity: item.quantity,
    }));
    
    const success = OrderService.completePurchase(
      currentUser.uid,
      orderTotal,
      addressDetails,
      paymentDetails,
      selectedProductsData,
    );
    // Todo: Show invoice to user
    navigate(CustomerRoutePaths.HOME);
    handleAfterPurchaseNotification(success);
  };

  const handleAfterPurchaseNotification = (success) => {
    if (success) {
      clearCart();
      notification.success({
        message: "Purchase Completed",
        description: "Your order has been successfully placed.",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Purchase Failed",
        description: "There was an error processing your order.",
        placement: "topRight",
      });
    }
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Text strong>
          <h3 style={{ textAlign: "center" }}>Order Summary</h3>
        </Text>
        <Checkout /> {/* Checkout */}
      </div>

      <Divider />

      <Row gutter={10} justify="center" align="middle">
        <AddressColumn form={addressForm} />{" "}
        {/* Use the AddressColumn component */}
        <Divider type="vertical" style={{ height: "100%" }} />
        <PaymentColumn
          form={paymentForm}
          selectedProducts={selectedProducts}
          proceedToPayment={proceedToPayment}
        />{" "}
        {/* Use the PaymentColumn component */}
      </Row>

      <Divider />
    </div>
  );
};

export default CheckoutView;
