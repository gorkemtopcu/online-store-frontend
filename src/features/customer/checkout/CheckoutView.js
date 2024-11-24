import React, { useEffect } from 'react';
import { Row, Col, Divider, Typography, Form } from 'antd';
import PaymentForm from './components/PaymentForm';
import AddressForm from './components/AddressForm';
import Checkout from './components/Checkout'; 
import useCartStore from 'context/CartStore';

const { Text } = Typography;

const CheckoutView = () => {
  const { cart } = useCartStore(); // Get the cart from the store
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
      })
      .catch((errorInfo) => {
        console.error("Address form validation failed:", errorInfo);
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