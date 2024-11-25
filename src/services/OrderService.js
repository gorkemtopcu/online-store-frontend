import axios from 'axios';
import { message } from 'antd';
import ServiceConstants from 'constants/ServiceConstants';

export const completePurchase = (addressDetails, paymentDetails, selectedProducts, clearCart) => {
  const orderDetails = {
    address: addressDetails,
    payment: paymentDetails,
    products: selectedProducts,
  };

  return axios.post(ServiceConstants.ORDERS, orderDetails)
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