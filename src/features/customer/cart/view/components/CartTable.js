import React, { useState } from "react";
import { Table, InputNumber, Button, Typography, Spin } from "antd";
import useCartStore from "context/CartStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "context/UserStore";

const { Text } = Typography;

const CartTable = () => {
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useCartStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const handleQuantityChange = (quantity, productId) => {
    if (quantity < 1) return;
    if (cart && cart[productId]) {
      addToCart(cart[productId].product, quantity - cart[productId].quantity);
    } else {
      console.error("Product not found in cart");
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.productId}`);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => handleProductClick(product)}
        >
          {loading && <Spin style={{ marginRight: 16 }} />}{" "}
          <img
            src={product.imageURL[0]}
            alt={product.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              marginRight: 16,
              objectFit: "contain",
            }}
            onLoad={() => setLoading(false)}
          />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "product",
      key: "price",
      render: (product) => {
        const discountedPrice =
          product.price * (1 - (product.discount || 0) / 100);
        return (
          <Text>
            ${discountedPrice.toFixed(2)}{" "}
            {product.discount > 0 && (
              <Text type="secondary" style={{ textDecoration: "line-through" }}>
                ${product.price.toFixed(2)}
              </Text>
            )}
          </Text>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.product.quantityInStock}
          value={quantity}
          onChange={(value) =>
            handleQuantityChange(value, record.product.productId)
          }
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => {
        const discountedPrice =
          record.product.price * (1 - (record.product.discount || 0) / 100);
        return (
          <Text>${(discountedPrice * record.quantity).toFixed(2)}</Text>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => removeFromCart(record.product.productId)}
        >
          Remove
        </Button>
      ),
    },
  ];

  console.log(currentUser);

  const dataSource = Object.values(cart);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.product.productId}
      pagination={false}
      bordered
    />
  );
};

export default CartTable;
