import React from "react";
import { Row, Col } from "antd";
import OrderCard from "./OrderCard";
import PropTypes from "prop-types";
import StringConstants from "constants/StringConstants";

const OrderList = ({ orders }) => {
  if (!orders.length) {
    return <div>{StringConstants.NO_ORDERS}</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      {orders.map((order) => (
        <Col key={order.orderId} span={24}>
          <OrderCard order={order} />
        </Col>
      ))}
    </Row>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default OrderList;
