import React, { useEffect, useState } from "react";
import RefundService from "services/RefundService";
import { message } from "antd";
import RefundTable from "./components/RefundTable";

const EvaluateRefunds = () => {
  const [refundRequests, setRefundRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRefundRequests();
  }, []);

  const fetchRefundRequests = async () => {
    try {
      const data = await RefundService.getAllRefundRequests();
      setRefundRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch refund requests:", error);
      setError("Failed to fetch refund requests");
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (refundRequest, status) => {
    try {
      const updatedRequest = { ...refundRequest, status };
      await RefundService.updateRefundStatus(updatedRequest);
      message.success("Refund status updated successfully");
      fetchRefundRequests(); // Refresh the list
    } catch (error) {
      console.error("Error updating refund status:", error);
      message.error("Failed to update refund status");
    }
  };

  const isOlderThan30Days = (orderDate) => {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - orderDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 30;
  };

  refundRequests.forEach((request) => {
    if (isOlderThan30Days(request.orderDate) && request.status === 'PENDING') {
      handleUpdateStatus(request, 'REJECTED');
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <RefundTable refundRequests={refundRequests} handleUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default EvaluateRefunds;