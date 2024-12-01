import React from "react";
import { Table, Button } from "antd";

const OrderTable = ({ orders, onEdit }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => `${record.payment.cardholderName}`,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return <Table dataSource={orders} columns={columns} rowKey="orderId" />;
};

export default OrderTable;
