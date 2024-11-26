import React from "react";
import { Row, Col, Empty } from "antd";
import StringConstants from "constants/StringConstants";
import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {
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
      {orders.map((order) => (
        <Col key={order.orderId} span={24}>
          <OrderCard order={order} />
        </Col>
      ))}
    </Row>
  );
};

export default OrderList;
