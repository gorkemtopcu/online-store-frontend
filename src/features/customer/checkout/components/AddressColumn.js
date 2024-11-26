import React from 'react';
import { Col, Typography } from 'antd';
import AddressForm from './AddressForm';

const { Text } = Typography;

const AddressColumn = ({ form }) => {
  return (
    <Col span={14} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ maxWidth: '500px', width: '100%', marginBottom: '20px' }}>
            <Text strong>
              <h4 style={{ textAlign: 'center' }}>Address</h4>
            </Text>
            <AddressForm form={form} /> {/* Address Form */}
          </div>
    </Col>
  );
};

export default AddressColumn;