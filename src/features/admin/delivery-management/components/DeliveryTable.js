import React from "react";
import { Table, Button } from "antd";

const DeliveryTable = ({ deliveries, onEdit }) => {
  const columns = [
    {
      title: "Delivery ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => onEdit(record)}>
          Edit Status
        </Button>
      ),
    },
  ];

  return <Table dataSource={deliveries} columns={columns} rowKey="id" />;
};

export default DeliveryTable;
