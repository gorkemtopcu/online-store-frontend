import React from 'react';
import { Row, Divider, Typography, Form } from 'antd';
import Checkout from './components/Checkout';
import useCartStore from 'context/CartStore';
import { completePurchase } from 'services/OrderService';
import PaymentColumn from './components/PaymentColumn';
import AddressColumn from './components/AddressColumn';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Text } = Typography;

const CheckoutView = () => {
  const { clearCart, getCartObjects } = useCartStore(); // Get the cart from the store
  const selectedProducts = getCartObjects(); // Get the products from the cart
  const [addressForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const navigate = useNavigate(); // Initialize useNavigate

  const proceedToPayment = () => {
    addressForm.validateFields()
      .then(() => {
        console.log("Address form is valid");
        paymentForm.validateFields()
          .then(() => {
            console.log("Payment form is valid");
            const addressDetails = addressForm.getFieldsValue();
            const paymentDetails = paymentForm.getFieldsValue();
            completePurchase(addressDetails, paymentDetails, selectedProducts, clearCart);

            // TODO: navigate to home page or wherever you want to go after successful purchase
            navigate('/'); // Navigate to the home page after successful purchase

          })
          .catch((errorInfo) => {
            console.error("Payment form validation failed:", errorInfo);
          });
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
        
        <AddressColumn 
          form={addressForm} 
        /> {/* Use the AddressColumn component */}

        <Divider type="vertical" style={{ height: '100%' }} />

        <PaymentColumn 
          form={paymentForm}
          selectedProducts={selectedProducts}
          proceedToPayment={proceedToPayment}
        /> {/* Use the PaymentColumn component */}

      </Row>

      <Divider />

    </div>
  );
};

export default CheckoutView;