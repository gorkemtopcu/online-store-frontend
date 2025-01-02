import React from "react";
import { Modal, Input } from "antd";

const RefundModal = ({ visible, reason, setReason, onOk, onCancel }) => (
  <Modal
    title="Request Refund"
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    <Input.TextArea
      rows={4}
      value={reason}
      onChange={(e) => setReason(e.target.value)}
    />
  </Modal>
);

export default RefundModal;