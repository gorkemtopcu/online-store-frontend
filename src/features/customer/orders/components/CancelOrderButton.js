import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import OrderService from 'services/OrderService';
import useUserStore from 'context/UserStore';

const CancelOrderButton = ({ orderId, onCancelOrder }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const orders = await OrderService.getOrders(currentUser.uid); // Fetch orders for the current user
        const order = orders.find(order => order.orderId === orderId);
        if (order) {
          setOrderStatus(order.orderStatus);
        } else {
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [orderId, currentUser.uid]);

  const handleCancelOrder = async () => {
    try {
      const result = await OrderService.updateOrderStatus(orderId, 'CANCELLED');
      if (result) {
        message.success('Order cancelled successfully');
        setOrders(orders.map(order => 
          order.orderId === orderId ? { ...order, status: 'CANCELLED' } : order
        ));
        setFilteredOrders(filteredOrders.map(order => 
          order.orderId === orderId ? { ...order, status: 'CANCELLED' } : order
        ));
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
    <Button 
      type="primary" 
      danger 
      onClick={handleCancelOrder} 
      disabled={orderStatus === 'DELIVERED' || orderStatus === 'CANCELLED'}
    >
      Cancel Order
    </Button>
  );
};

export default CancelOrderButton;