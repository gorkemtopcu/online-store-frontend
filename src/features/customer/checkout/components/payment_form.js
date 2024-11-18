import React from 'react';
import { Card, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const PaymentForm = ({ product }) => {
  const { name, price } = product;

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment successful!');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <Card title="Payment Details" bordered={false}>
        
        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '15px' }}>
            <label>Card Number:</label>
            <Input type="text" required placeholder="Enter your card number" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Expiry Date:</label>
            <Input type="text" placeholder="MM/YY" required />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>CVV:</label>
            <Input.Password required placeholder="Enter CVV" />
          </div>
          
        </form>
      </Card>
    </div>
  );
};

export default PaymentForm;
