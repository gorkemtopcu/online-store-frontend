import React, { useState } from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import ExpandedOrderDetails from "./ExpandedOrderDetails";
import StatusTag from "./StatusTag";
import StringConstants from "constants/StringConstants";
import ReviewModal from "./ReviewButton";
import RequestRefundButton from "features/admin/refund_requests/components/RequestRefundButton";
import handleRequestRefund from "features/admin/refund_requests/components/RequestRefundButton";
import CancelOrderButton from "./CancelOrderButton";

const { Text } = Typography;

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const handleOrderCancelled = (orderId) => {
    console.log(`Order ${orderId} cancelled`);
    window.location.reload();
  };

  return (
    <Card
      style={{
        backgroundColor: "#e3f2fd",
        color: "#333",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
      bodyStyle={{ padding: "10px 20px" }}
    >
      <Row align="middle">
        <Col flex="auto">
          <Text strong style={{ color: "#0d47a1", fontSize: "16px" }}>
            {StringConstants.ORDER_NO + order.orderId}
          </Text>
          <br />
          <StatusTag status={order.orderStatus} />
          <br />
          <Text style={{ color: "#616161", fontSize: "14px" }}>
            {order.orderDate}
          </Text>
          <br />
          <Text strong style={{ color: "#1b5e20", fontSize: "16px" }}>
            {order.orderTotal.toFixed(2)} $
          </Text>
        </Col>

        <Col>
          <Button
            type="text"
            icon={expanded ? <UpOutlined /> : <DownOutlined />}
            onClick={toggleExpand}
            style={{ color: "#333" }}
          />
        </Col>
      </Row>

      {/* Display products */}
      {expanded && (
        <div style={{ marginTop: "10px" }}>
          {order.products.map((product, index) => {
            const totalCost = product.quantity * product.price;
            return (
              <Row key={index} style={{ marginBottom: "10px" }} align="middle">
                <Col flex="80px">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      border: "1px solid #90caf9",
                    }}
                  />
                </Col>
                <Col flex="auto">
                  <Text strong>
                    {product.name} (x{product.quantity})
                  </Text>
                  <br />
                  <Text style={{ color: "#4caf50", fontSize: "18px" }} strong>
                    {totalCost.toFixed(2)} $
                  </Text>
                </Col>
                <ReviewModal product={product}></ReviewModal>
                <Col span={1}></Col>
                <RequestRefundButton 
                  orderId={order.orderId} 
                  productId={product.productId} 
                  order={order} 
                  onRequestRefund={handleRequestRefund} 
                />
              </Row>
            );
          })}
        </div>
      )}

      {/* Expanded Order Details */}
      {expanded && <ExpandedOrderDetails order={order} />}
      <div style={{ marginTop: "10px" }}></div>
      <CancelOrderButton orderId={order.orderId} onCancelOrder={handleOrderCancelled} />
    </Card>
  );
};

export default OrderCard;
