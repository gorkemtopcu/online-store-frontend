import React, { useEffect, useState } from "react";
import RefundService from "services/RefundService";
import { message, Table, Button } from "antd";

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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

return (
    <div>
        <Table dataSource={refundRequests} rowKey="refundRequestId">
            <Table.Column title="Order ID" dataIndex="orderId" key="orderId" />
            <Table.Column title="Product ID" dataIndex="productId" key="productId" />
            <Table.Column title="Product Name" dataIndex="productName" key="productName" />
            <Table.Column title="User Email" dataIndex="userEmail" key="userEmail" />
            <Table.Column title="Order Date" dataIndex="orderDate" key="orderDate" />
            <Table.Column title="Reason" dataIndex="reason" key="reason" />
            <Table.Column title="Status" dataIndex="status" key="status" />
            <Table.Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                    <span>
                        <Button
                            style={{ marginRight: 8 }}
                            color="primary"
                            variant="solid"
                            onClick={() => handleUpdateStatus(record, 'APPROVED')}
                            disabled={record.status !== 'PENDING'}
                        >
                            Approve
                        </Button>
                        <Button
                            color="danger"
                            variant="solid"
                            onClick={() => handleUpdateStatus(record, 'REJECTED')}
                            disabled={record.status !== 'PENDING'}
                        >
                            Reject
                        </Button>
                    </span>
                )}
            />
        </Table>
    </div>
);
};

export default EvaluateRefunds;