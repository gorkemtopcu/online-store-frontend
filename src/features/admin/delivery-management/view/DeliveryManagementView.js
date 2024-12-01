import React, { useState, useEffect } from "react";
import { Table, Button, message, Modal, Select } from "antd";
import { DeliveryService } from "services/DeliveryService"; // Doğru path olduğundan emin olun

const DeliveryManagementView = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Firebase'den teslimat verilerini çek
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await DeliveryService.getAllDeliveries();
        setDeliveries(data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        message.error("Failed to load deliveries.");
      }
    };

    fetchDeliveries();
  }, []);

  // Teslimat durumunu düzenlemek için modal aç
  const handleEdit = (delivery) => {
    setEditingDelivery(delivery);
    setNewStatus(delivery.orderStatus); // Mevcut durum
    setIsEditModalVisible(true);
  };

  // Teslimat durumunu kaydet
  const handleSave = async () => {
    if (!editingDelivery || !newStatus) {
      message.warning("Please select a valid status.");
      return;
    }

    try {
      await DeliveryService.updateDeliveryStatus(editingDelivery.id, newStatus);
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.id === editingDelivery.id
            ? { ...delivery, orderStatus: newStatus }
            : delivery
        )
      );
      setIsEditModalVisible(false);
      message.success("Delivery status updated successfully!");
    } catch (error) {
      console.error("Error updating delivery status:", error);
      message.error("Failed to update delivery status.");
    }
  };

  const columns = [
    {
      title: "Delivery ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Delivery Status</h2>
      <Table dataSource={deliveries} columns={columns} rowKey="id" />
      <Modal
        title="Edit Delivery Status"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        <Select
          value={newStatus}
          onChange={(value) => setNewStatus(value)}
          style={{ width: "100%" }}
        >
          <Select.Option value="PROCESSING">Processing</Select.Option>
          <Select.Option value="SHIPPED">Shipped</Select.Option>
          <Select.Option value="DELIVERED">Delivered</Select.Option>
          <Select.Option value="CANCELLED">Cancelled</Select.Option>
        </Select>
      </Modal>
    </div>
  );
};

export default DeliveryManagementView;
