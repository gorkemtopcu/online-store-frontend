import React, { useState } from "react";
import { Table, InputNumber, Button, Typography, Spin } from "antd";

const { Text } = Typography;

const CartTable = ({ cartItems, onQuantityChange, onRemoveItem }) => {
  const [loading, setLoading] = useState(true); // State to track image loading

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {loading && <Spin style={{ marginRight: 16 }} />}{" "}
          {/* Show spinner while loading */}
          <img
            src={image}
            alt={record.name}
            style={{ width: 50, borderRadius: 8, marginRight: 16 }}
            onLoad={() => setLoading(false)} // Set loading to false when the image is loaded
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text>${price}</Text>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={quantity}
          onChange={(value) => onQuantityChange(value, record.id)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => (
        <Text>${(record.price * record.quantity).toFixed(2)}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger onClick={() => onRemoveItem(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={cartItems}
      columns={columns}
      rowKey="id"
      pagination={false}
      bordered
    />
  );
};

export default CartTable;
