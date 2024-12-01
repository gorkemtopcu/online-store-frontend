import React, { useState } from 'react';
import { Row, Divider, Typography, Form, notification, Modal } from "antd";
import Checkout from "./components/Checkout";
import useCartStore from "context/CartStore";
import useUserStore from "context/UserStore";
import PaymentColumn from "./components/PaymentColumn";
import AddressColumn from "./components/AddressColumn";
import { useNavigate } from "react-router-dom";
import OrderService from "services/OrderService";
import { CustomerRoutePaths } from "constants/route_paths";
import BankingView from './BankingView';
const { Text } = Typography;

const CheckoutView = () => {
  const { clearCart, getCartObjects, getTotalPrice } = useCartStore();
  const selectedProducts = getCartObjects();
  const [addressForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const { currentUser } = useUserStore();
  const [isBankingModalVisible, setIsBankingModalVisible] = useState(false);
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
            setIsBankingModalVisible(true);
            //handleOnPurchase();
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
    console.log("Selected: ", selectedProducts[0].product.imageURL);
    // get the product ids and quantities from the selected products
    const selectedProductsData = selectedProducts.map((item) => ({
      productId: item.product?.productId || null,
      name: item.product?.name || null,
      quantity: item.quantity,
      imageURL: item.product?.imageURL[0] || null,
      price: item.product?.price || null,
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

  const handleOpenBankingModal = () => {
    setIsBankingModalVisible(true);
  };

  const handleCloseBankingModal = () => {
    setIsBankingModalVisible(false);
  };

  const handleVerificationComplete = (isVerified) => {
    if (isVerified) {
      handleOnPurchase();
    } else {
      alert('Verification failed. Please try again.');
    }
    handleCloseBankingModal();
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

      {/* Banking Modal */}
      <Modal
        title="3D Secure Verification"
        visible={isBankingModalVisible}
        onCancel={handleCloseBankingModal}
        footer={null}
      >
        <BankingView onVerificationComplete={handleVerificationComplete} />
      </Modal>

      <Divider />
    </div>
  );
};

export default CheckoutView;
