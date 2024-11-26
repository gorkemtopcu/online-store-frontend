import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import OrderViewNavbar from "./components/OrderViewNavbar";
import OrderCard from "./components/OrderCard";
import StringConstants from "constants/StringConstants";
import OrderService from "services/OrderService";
import useUserStore from "context/UserStore";

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useUserStore();

  useEffect(() => {
    // Fetch orders when the component mounts
    OrderService.getOrders(currentUser.uid)
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data); // Initialize filtered orders with all orders
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      });
  }, [currentUser.uid]);

  if (loading) {
    return (
      <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <OrderViewNavbar orders={orders} setFilteredOrders={setFilteredOrders} />
        <div>{StringConstants.LOADING}</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <OrderViewNavbar orders={orders} setFilteredOrders={setFilteredOrders} />
      {filteredOrders.length ? (
        <Row gutter={[16, 16]}>
          {filteredOrders.map((order) => (
            <Col key={order.orderId} span={24}>
              <OrderCard order={order} />
            </Col>
          ))}
        </Row>
      ) : (
        <div>{StringConstants.NO_ORDERS}</div>
      )}
    </div>
  );
};

export default OrderView;
