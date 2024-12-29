import React, { useState, useEffect } from "react";
import { Button, Modal, Input, message } from "antd";
import useUserStore from "context/UserStore";
import OrderService from "services/OrderService";
import RefundService from "services/RefundService";

const RequestRefundButton = ({ orderId, productId, order, onRequestRefund }) => {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [refundStatus, setRefundStatus] = useState(null);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchRefundRequests = async () => {
      try {
        const refundRequests = await RefundService.getAllRefundRequests();
        const existingRequest = refundRequests.find(
          (request) => request.orderId === orderId && request.productId === productId
        );
        if (existingRequest) {
          setRefundStatus(existingRequest.status);
        }
      } catch (error) {
        console.error("Error fetching refund requests:", error);
      }
    };

    fetchRefundRequests();
  }, [orderId, productId]);

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

  const getButtonText = () => {
    if (refundStatus === 'APPROVED') {
      return 'Refund Approved';
    } 
    else if (refundStatus === 'REJECTED') {
      return 'Refund Rejected'
    }
    else if (refundStatus) {
      return 'Refund Requested';
    } 
    else {
      return 'Request Refund';
    }
  };

  return (
    <>
      <Button
        style={{ width: '150px' }}
        color="danger"
        onClick={() => setVisible(true)}
        disabled={refundStatus === 'APPROVED' || refundStatus === 'REJECTED' || refundStatus === 'REQUESTED'}
      >
        {getButtonText()}
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