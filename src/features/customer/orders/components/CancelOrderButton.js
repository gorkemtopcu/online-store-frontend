import React, { useState } from 'react';
import { Button, message } from 'antd';
import OrderService from 'services/OrderService';

const CancelOrderButton = ({ orderId, onCancelOrder }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleCancelOrder = async () => {
    try {
      const result = await OrderService.cancelOrder(orderId);
      if (result) {
        message.success('Order cancelled successfully');
        setOrders(orders.filter(order => order.orderId !== orderId));
        setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId));
        if (onCancelOrder) {
          onCancelOrder(orderId);
        }
      } else {
        message.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      message.error('Failed to cancel order');
    }
  };

  return (
    <Button type="primary" danger onClick={handleCancelOrder}>
      Cancel Order
    </Button>
  );
};

export default CancelOrderButton;