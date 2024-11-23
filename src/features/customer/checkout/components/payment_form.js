import React, { useState } from 'react';
import { Card, Input, Button, Radio } from 'antd';

const PaymentForm = ({ product }) => {
  const { price } = product;
  const [cardType, setCardType] = useState('Visa'); // Default card type
  const [cardholderName, setCardholderName] = useState(''); // Cardholder name

  const handlePayment = (e) => {
    e.preventDefault();
    if (!cardholderName) {
      alert('Please enter the cardholder name.');
      return;
    }
    alert(`Payment successful using ${cardType}!\nCardholder: ${cardholderName}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <Card title="Payment Details" bordered={false}>
        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '15px' }}>
            <label>Card Type:</label>
            <Radio.Group
              onChange={(e) => setCardType(e.target.value)}
              value={cardType}
              style={{ marginLeft: '10px' }}
            >
              <Radio value="Visa">Visa</Radio>
              <Radio value="MasterCard">MasterCard</Radio>
            </Radio.Group>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Cardholder Name:</label>
            <Input
              type="text"
              required
              placeholder="Enter cardholder's name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

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

          <Button type="primary" htmlType="submit">
            Complete Purchase{price}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PaymentForm;
