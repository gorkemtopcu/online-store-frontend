import React, { useState } from "react";
import { Button, Input } from "antd";
import StringConstants from "constants/StringConstants";

const { Search } = Input;

const OrderViewNavbar = ({ orders, setFilteredOrders }) => {
  const [activeFilter, setActiveFilter] = useState(StringConstants.ALL);

  const sortOrders = (criteria) => {
    let sortedOrders = [...orders];

    switch (criteria) {
      case StringConstants.PROCESSING:
        sortedOrders = orders.filter((order) => order.orderStatus === "PROCESSING");
        break;
      case StringConstants.IN_TRANSIT:
        sortedOrders = orders.filter((order) => order.orderStatus === "IN_TRANSIT");
        break;
      case StringConstants.DELIVERED:
        sortedOrders = orders.filter((order) => order.orderStatus === "DELIVERED");
        break;
      case StringConstants.CANCELLED:
        sortedOrders = orders.filter((order) => order.orderStatus === "CANCELLED");
        break;
      case StringConstants.ALL:
      default:
        sortedOrders = [...orders]; // Reset to all orders
    }

    setFilteredOrders(sortedOrders);
    setActiveFilter(criteria);
  };

  const getButtonStyle = (filter) => ({
    backgroundColor: activeFilter === filter ? "#1890ff" : "white", // Highlight selected button
    color: activeFilter === filter ? "white" : "#333",
    borderRadius: "8px",
    marginRight: "10px",
  });

  return (
    <div style={{ marginBottom: "20px", color: "#333" }}>
      <Search
        placeholder={StringConstants.SEARCH_ORDERS}
        enterButton={StringConstants.SEARCH}
        size="large"
        style={{ width: "300px", marginRight: "20px", borderRadius: "8px" }}
      />
      <Button
        style={getButtonStyle(StringConstants.ALL)}
        onClick={() => sortOrders(StringConstants.ALL)}
      >
        {StringConstants.ALL_ORDERS}
      </Button>
      <Button
        style={getButtonStyle(StringConstants.PROCESSING)}
        onClick={() => sortOrders(StringConstants.PROCESSING)}
      >
        {StringConstants.PROCESSING}
      </Button>
      <Button
        style={getButtonStyle(StringConstants.IN_TRANSIT)}
        onClick={() => sortOrders(StringConstants.IN_TRANSIT)}
      >
        {StringConstants.IN_TRANSIT}
      </Button>
      <Button
        style={getButtonStyle(StringConstants.DELIVERED)}
        onClick={() => sortOrders(StringConstants.DELIVERED)}
      >
        {StringConstants.DELIVERED}
      </Button>
      <Button
        style={getButtonStyle(StringConstants.CANCELLED)}
        onClick={() => sortOrders(StringConstants.CANCELLED)}
      >
        {StringConstants.CANCELLED}
      </Button>
    </div>
  );
};

export default OrderViewNavbar;
