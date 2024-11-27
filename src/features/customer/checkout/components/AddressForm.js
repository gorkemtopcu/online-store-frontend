// AddressForm.js
import React from 'react';
import { Form, Input } from 'antd';

const AddressForm = ({ form }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      name="addressForm"
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'Please enter your first name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: 'Please enter your last name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please enter your address' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: 'Please enter your city' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="state"
        label="State"
        rules={[{ required: true, message: 'Please enter your state' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="zip"
        label="Zip Code"
        rules={[
          { required: true, message: 'Please enter your zip code' },
          { len: 5, message: 'Zip code must be exactly 5 digits' },
          { pattern: /^\d{5}$/, message: 'Zip code must be 5 digits' }
        ]}
      >
        <Input maxLength={5} />
      </Form.Item>

      <Form.Item
        name="country"
        label="Country"
        rules={[{ required: true, message: 'Please enter your country' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddressForm;