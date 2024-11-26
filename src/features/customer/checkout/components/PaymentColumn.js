import React from 'react';
import { Col, Typography } from 'antd';
import PaymentForm from './PaymentForm'; // Import the PaymentForm component

const { Text } = Typography;

const PaymentColumn = ({ form, selectedProducts, proceedToPayment }) => {
  return (
    <Col span={10} style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <Text strong>
          <h4 style={{ textAlign: 'center' }}>Payment Details</h4>
        </Text>
        <PaymentForm  
          form={form}
          product={selectedProducts} 
          onProceedToPayment={proceedToPayment} /> {/* Payment Form */}
      </div>
    </Col>
  );
};

export default PaymentColumn;