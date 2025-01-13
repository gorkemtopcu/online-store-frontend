import React from "react";
import { Table, Button } from "antd";
import { render } from "@testing-library/react";

const OrderTable = ({ orders, onEdit }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer ID",
      dataIndex: "uid",
      key: "uid",
    },

    {
      title: "Customer",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => `${record.payment.cardholderName}`,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => `${record.address.address}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => record.products.reduce((total, product) => total + product.quantity, 0),
    },
    {
      title: "Order Total",
      dataIndex: "orderTotal",
      key: "orderTotal",
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
