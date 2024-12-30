import React from "react";
import { Row, Col, Empty } from "antd";
import OrderCard from "./OrderCard";
import StringConstants from "constants/StringConstants";

const OrderList = ({ orders }) => {
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.orderDate).getTime();
    const dateB = new Date(b.orderDate).getTime();
    return dateB - dateA;
  });

  return !orders?.length ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Empty description={StringConstants.NO_ORDERS} />
    </div>
  ) : (
    <Row gutter={[16, 16]}>
      {sortedOrders.map((order) => (
        <Col key={order.orderId} span={24}>
          <OrderCard order={order} />
        </Col>
      ))}
    </Row>
  );
};

export default OrderList;