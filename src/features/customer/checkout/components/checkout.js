import React from 'react';
import { Button, Flex, Typography } from 'antd';
import CheckoutCard from 'components/cards/checkout_card';

const Checkout = ({ products, onProceedToPayment }) => {
  // Calculate the total price for all products
  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h2>Checkout</h2>

      {/* Loop through each product and display it using CheckoutCard */}
      {products.map((product) => (
        <CheckoutCard key={product.productId} product={product} />
      ))}

      {/* Order Summary */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography.Title level={4}>Order Summary</Typography.Title>
        <Typography.Text>
          <strong>Total Price: </strong>${totalPrice.toFixed(2)}
        </Typography.Text>
      </div>

      {/* Proceed to Payment Button */}
      <Flex justify="center" style={{ marginTop: '20px' }}>
        <Button
          type="primary"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
          onClick={onProceedToPayment}
        >
          Proceed to Payment
        </Button>
      </Flex>
    </div>
  );
};

export default Checkout;
