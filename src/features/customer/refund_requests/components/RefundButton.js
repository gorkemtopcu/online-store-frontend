import React from "react";
import { Button } from "antd";

const RefundButton = ({ refundStatus, orderStatus, onClick }) => {
  const getButtonText = () => {
    if (refundStatus === 'APPROVED') {
      return 'Refund Approved';
    } 
    else if (refundStatus === 'REJECTED') {
      return 'Refund Rejected';
    }
    else if (refundStatus) {
      return 'Refund Requested';
    } 
    else {
      return 'Request Refund';
    }
  };

  return (
    <Button
      style={{ width: '150px' }}
      color="danger"
      onClick={onClick}
      disabled={refundStatus === 'APPROVED' || refundStatus === 'PENDING' || refundStatus === 'REJECTED' || refundStatus === 'REQUESTED' || orderStatus === 'CANCELLED' || orderStatus === 'DELIVERED'}
    >
      {getButtonText()}
    </Button>
  );
};

export default RefundButton;