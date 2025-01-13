import { useState, useEffect } from "react";
import { message } from "antd";
import OrderService from "services/OrderService";

const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await OrderService.getAllOrders();
        const sortedData = data.sort((a, b) =>
          b.orderDate.localeCompare(a.orderDate)
        );
        setOrders(sortedData);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        message.error("Failed to load deliveries.");
      }
    };

    fetchDeliveries();
  }, []);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setNewStatus(order.orderStatus);
    setIsEditModalVisible(true);
  };

  const handleSave = async () => {
    if (!editingOrder || !newStatus) {
      message.warning("Please select a valid status.");
      return;
    }

    try {
      await OrderService.updateOrderStatus(editingOrder.orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === editingOrder.orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );
      setIsEditModalVisible(false);
      message.success("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status.");
    }
  };

  return {
    orders,
    isEditModalVisible,
    editingOrder,
    newStatus,
    setNewStatus,
    setIsEditModalVisible,
    handleEdit,
    handleSave,
  };
};

export default useOrderManagement;
