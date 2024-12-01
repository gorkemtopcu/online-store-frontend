import React, { useState } from "react";
import { Modal, Select } from "antd";

const EditDeliveryModal = ({ visible, delivery, onSave, onCancel }) => {
  const [status, setStatus] = useState(delivery?.status || "");

  const handleSave = () => {
    onSave({ ...delivery, status });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Delivery Status"
      onOk={handleSave}
      onCancel={onCancel}
    >
      <p>Delivery ID: {delivery?.id}</p>
      <p>Customer Name: {delivery?.customerName}</p>
      <Select
        value={status}
        onChange={setStatus}
        style={{ width: "100%" }}
        placeholder="Select a status"
      >
        <Select.Option value="Pending">Pending</Select.Option>
        <Select.Option value="Shipped">Shipped</Select.Option>
        <Select.Option value="Delivered">Delivered</Select.Option>
      </Select>
    </Modal>
  );
};

export default EditDeliveryModal;
