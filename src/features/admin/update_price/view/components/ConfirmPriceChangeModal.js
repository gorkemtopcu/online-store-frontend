import React from "react";
import { Modal } from "antd";

const ConfirmPriceChangeModal = ({
  visible,
  productName,
  newPrice,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title="Confirm Price Change"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      cancelText="Cancel"
    >
      <p>
        Are you sure you want to change the price of <strong>{productName}</strong> to{" "}
        <strong>{newPrice}</strong>?
      </p>
    </Modal>
  );
};

export default ConfirmPriceChangeModal;
