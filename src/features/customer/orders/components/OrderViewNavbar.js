import React, { useState } from "react";
import { Button, Input } from "antd";
import StringConstants from "constants/StringConstants";
import useFilterOrders from "../hooks/UseFilterOrders";

const { Search } = Input;

const OrderViewNavbar = ({ orders, setFilteredOrders }) => {
  const [activeFilter, setActiveFilter] = useState(StringConstants.ALL);

  const filterStrategies = useFilterOrders(orders);

  const sortOrders = (criteria) => {
    const strategy =
      filterStrategies[criteria] || filterStrategies[StringConstants.ALL];
    const sortedOrders = strategy();

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
        onSearch={(value) => {
          const searchedOrders = orders.filter((order) =>
            order.orderId.includes(value)
          );
          setFilteredOrders(searchedOrders);
        }}
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
