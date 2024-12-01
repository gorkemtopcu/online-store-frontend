import React from "react";
import { Modal, Select } from "antd";
import OrderStatusConstants from "constants/OrderStatusConstans";

const OrderStatusModal = ({
  visible,
  order,
  status,
  onStatusChange,
  onSave,
  onCancel,
}) => {
  return (
    <Modal
      title="Edit Order Status"
      open={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="Save"
      cancelText="Cancel"
    >
      <Select
        value={status}
        onChange={onStatusChange}
        style={{ width: "100%" }}
      >
        <Select.Option value={OrderStatusConstants.PENDING}>
          {OrderStatusConstants.PENDING}
        </Select.Option>
        <Select.Option value={OrderStatusConstants.IN_TRANSIT}>
          {OrderStatusConstants.IN_TRANSIT}
        </Select.Option>
        <Select.Option value={OrderStatusConstants.DELIVERED}>
          {OrderStatusConstants.DELIVERED}
        </Select.Option>
        <Select.Option value={OrderStatusConstants.CANCELLED}>
          {OrderStatusConstants.CANCELLED}
        </Select.Option>
      </Select>
    </Modal>
  );
};

export default OrderStatusModal;
