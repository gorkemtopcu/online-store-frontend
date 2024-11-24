import React, { useEffect } from 'react';
import { Row, Col, Divider, Typography, Form, message } from 'antd';
import axios from 'axios';
import PaymentForm from './components/PaymentForm';
import AddressForm from './components/AddressForm';
import Checkout from './components/Checkout'; 
import useCartStore from 'context/CartStore';
import ServiceConstants from 'constants/ServiceConstants';

const { Text } = Typography;

const CheckoutView = () => {
  const { cart, clearCart } = useCartStore(); // Get the cart from the store
  const selectedProducts = Object.values(cart); // Convert cart object to array
  const [addressForm] = Form.useForm();
  const [paymentForm] = Form.useForm();

  useEffect(() => {
    console.log("Selected Products:", selectedProducts);
  }, [selectedProducts]);

  const proceedToPayment = () => {
    addressForm.validateFields()
      .then(() => {
        console.log("Address form is valid");
        paymentForm.validateFields()
          .then(() => {
            console.log("Payment form is valid");
            completePurchase();
          })
          .catch((errorInfo) => {
            console.error("Payment form validation failed:", errorInfo);
          });
      })
      .catch((errorInfo) => {
        console.error("Address form validation failed:", errorInfo);
      });
  };

  const completePurchase = () => {
    const addressDetails = addressForm.getFieldsValue();
    const paymentDetails = paymentForm.getFieldsValue();
    const orderDetails = {
      address: addressDetails,
      payment: paymentDetails,
      products: selectedProducts,
    };

    axios.post(ServiceConstants.ORDERS, orderDetails)
      .then(response => {
        message.success('Purchase completed successfully!');
        clearCart(); // Clear the cart after successful purchase
        console.log('Order details sent to backend:', response.data);
      })
      .catch(error => {
        message.error('Failed to complete purchase. Please try again.');
        console.error('Error sending order details to backend:', error);
      });
  };

  return (
    <div>
      <div style={{ maxWidth: '500px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <Text strong>
          <h3 style={{ textAlign: 'center' }}>Order Summary</h3>
        </Text>
        <Checkout /> {/* Checkout */}
      </div>

      <Divider />

      <Row gutter={10} justify="center" align="middle">
        <Col span={14} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ maxWidth: '500px', width: '100%', marginBottom: '20px' }}>
            <Text strong>
              <h4 style={{ textAlign: 'center' }}>Address</h4>
            </Text>
            <AddressForm form={addressForm} /> {/* Address Form */}
          </div>
        </Col>

        <Divider type="vertical" style={{ height: '100%' }} />

        <Col span={10} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <Text strong>
              <h4 style={{ textAlign: 'center' }}>Payment Details</h4>
            </Text>
            <PaymentForm  
              form={paymentForm}
              product={selectedProducts} 
              onProceedToPayment={proceedToPayment} /> {/* Payment Form */}
          </div>
        </Col>
      </Row>

      <Divider />

    </div>
  );
};

export default CheckoutView;