import React from "react";
import { Table } from "antd";
import RefundActions from "./RefundActions";

const RefundTable = ({ refundRequests, handleUpdateStatus }) => {
  return (
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
          <RefundActions record={record} handleUpdateStatus={handleUpdateStatus} />
        )}
      />
    </Table>
  );
};

export default RefundTable;