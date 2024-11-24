import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

const PaymentForm = ({ form, product, onProceedToPayment }) => {
  const handlePayment = () => {
    form.validateFields()
      .then(() => {
        console.log("Payment form is valid");
        onProceedToPayment();
      })
      .catch((errorInfo) => {
        console.error("Payment form validation failed:", errorInfo);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="paymentForm"
      onFinish={handlePayment}
    >
      <Form.Item
        name="cardType"
        label="Card Type"
        rules={[{ required: true, message: 'Please select your card type' }]}
      >
        <Radio.Group>
          <Radio value="Visa">Visa</Radio>
          <Radio value="MasterCard">MasterCard</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="cardholderName"
        label="Cardholder Name"
        rules={[
          { required: true, message: 'Please enter the cardholder\'s name' },
          { pattern: /^[A-Za-z\s]+$/, message: 'Cardholder name must contain only letters' }
        ]}
      >
        <Input placeholder="Enter cardholder's name" />
      </Form.Item>

      <Form.Item
        name="cardNumber"
        label="Card Number"
        rules={[
          { required: true, message: 'Please enter your card number' },
          { len: 16, message: 'Card number must be exactly 16 digits' },
          { pattern: /^\d{16}$/, message: 'Card number must be 16 digits' }
        ]}
      >
        <Input placeholder="Enter your card number" maxLength={16} />
      </Form.Item>

      <Form.Item
        name="expiryDate"
        label="Expiry Date"
        rules={[
          { required: true, message: 'Please enter the expiry date' },
          { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Expiry date must be in MM/YY format' }
        ]}
      >
        <Input placeholder="MM/YY" />
      </Form.Item>

      <Form.Item
        name="cvv"
        label="CVV"
        rules={[
          { required: true, message: 'Please enter the CVV' },
          { len: 3, message: 'CVV must be exactly 3 digits' },
          { pattern: /^\d{3}$/, message: 'CVV must be 3 digits' }
        ]}
      >
        <Input placeholder="Enter CVV" maxLength={3} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          Complete Purchase
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;