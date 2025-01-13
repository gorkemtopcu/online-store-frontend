import React from "react";
import { Button } from "antd";

const isOlderThan30Days = (orderDate) => {
  const orderDateObj = new Date(orderDate);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - orderDateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 30;
};

const RefundButton = ({ refundStatus, orderStatus, orderDate, onClick }) => {
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
      disabled={refundStatus === 'APPROVED' || refundStatus === 'PENDING' || refundStatus === 'REJECTED' || refundStatus === 'REQUESTED' || orderStatus === 'CANCELLED' || (isOlderThan30Days(orderDate) && orderStatus === 'DELIVERED')}
    >
      {getButtonText()}
    </Button>
  );
};

export default RefundButton;