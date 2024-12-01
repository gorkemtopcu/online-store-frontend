import React, { useState } from "react";
import { Row, Divider, Typography, Form, notification, Modal } from "antd";
import Checkout from "./components/Checkout";
import useCartStore from "context/CartStore";
import useUserStore from "context/UserStore";
import PaymentColumn from "./components/PaymentColumn";
import AddressColumn from "./components/AddressColumn";
import { useNavigate } from "react-router-dom";
import OrderService from "services/OrderService";
import BankingView from "./BankingView";
import InvoiceService from "services/InvoiceService";

const { Text } = Typography;

const CheckoutView = () => {
  const { clearCart, getCartObjects, getTotalPrice } = useCartStore();
  const selectedProducts = getCartObjects();
  const [addressForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const { currentUser } = useUserStore();
  const [isBankingModalVisible, setIsBankingModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleOnPurchase = async () => {
    const addressDetails = addressForm.getFieldsValue();
    const paymentDetails = paymentForm.getFieldsValue();
    const orderTotal = getTotalPrice().toFixed(2);

    const selectedProductsData = selectedProducts.map((item) => ({
      productId: item.product?.productId || null,
      name: item.product?.name || null,
      quantity: item.quantity,
      imageURL: item.product?.imageURL[0] || null,
      price: item.product?.price || null,
    }));

    try {
      const orderId = await OrderService.completePurchase(
        currentUser.uid,
        orderTotal,
        addressDetails,
        paymentDetails,
        selectedProductsData
      );

      console.log("Order ID from OrderService.completePurchase:", orderId);

      if (orderId) {
        try {
          await InvoiceService.fetchInvoice(orderId); 
          navigate(`/invoice/${orderId}`); 
        } catch (invoiceError) {
          console.error("Error fetching invoice:", invoiceError);
          notification.warning({
            message: "Invoice Error",
            description: "Order placed but could not fetch invoice. Check your email.",
            placement: "topRight",
          });
        }

        notification.success({
          message: "Purchase Completed",
          description: "Your order has been successfully placed.",
          placement: "topRight",
        });
        clearCart();
      } else {
        notification.warning({
          message: "Order Error",
          description: "Order placed but could not fetch invoice. Check your email.",
          placement: "topRight",
        });
        clearCart();
      }
    } catch (error) {
      console.error("Error completing purchase:", error);
      notification.error({
        message: "Purchase Failed",
        description: "There was an error processing your purchase.",
        placement: "topRight",
      });
    }
  };

  const handleVerificationComplete = (isVerified) => {
    if (isVerified) {
      handleOnPurchase();
    } else {
      alert("Verification failed. Please try again.");
    }
    setIsBankingModalVisible(false);
  };

  return (
    <div>
      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        <Text strong>
          <h3>Order Summary</h3>
        </Text>
        <Checkout />
      </div>
      <Divider />
      <Row gutter={10} justify="center" align="middle">
        <AddressColumn form={addressForm} />
        <Divider type="vertical" />
        <PaymentColumn
          form={paymentForm}
          selectedProducts={selectedProducts}
          proceedToPayment={() => setIsBankingModalVisible(true)}
        />
      </Row>
      {/* 3D Secure Modal */}
      <Modal
        title="3D Secure Verification"
        visible={isBankingModalVisible}
        onCancel={() => setIsBankingModalVisible(false)}
        footer={null}
      >
        <BankingView onVerificationComplete={handleVerificationComplete} />
      </Modal>
    </div>
  );
};

export default CheckoutView;
