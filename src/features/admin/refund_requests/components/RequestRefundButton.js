import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { message } from "antd";
import useUserStore from "context/UserStore";
import OrderService from "services/OrderService";

const RequestRefundButton = ({ orderId, productId, order, onRequestRefund }) => {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");
  const { currentUser } = useUserStore();

  const handleRequestRefund = async () => {
    try {
      console.log('Order:', order);
      console.log('Product ID:', productId);

      const product = order.products.find(product => product.productId === productId);
      if (!product) {
        throw new Error("Product not found");
      }

      const refundRequest = {
        orderId,
        productId,
        productName: product.name,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        orderDate: order.orderDate,
        reason,
      };
      const result = await OrderService.requestRefund(refundRequest);
      if (result) {
        message.success("Refund request submitted successfully");
      } else {
        message.error("Failed to submit refund request");
      }

        setVisible(false);

    } catch (error) {
      console.error("Error requesting refund:", error);
      message.error("Failed to submit refund request");
      setVisible(false);
    }
  };

  return (
    <>
      <Button color="danger" onClick={() => setVisible(true)}>
        Request Refund
      </Button>
      <Modal
        title="Request Refund"
        visible={visible}
        onOk={handleRequestRefund}
        onCancel={() => setVisible(false)}
      >
        <Input.TextArea
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default RequestRefundButton;