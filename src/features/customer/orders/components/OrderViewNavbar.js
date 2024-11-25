import React from "react";
import { Button, Input } from "antd";
import StringConstants from "constants/StringConstants";

const { Search } = Input;

const OrderViewNavbar = ({ sortOrders }) => (
  <div style={{ marginBottom: "20px", color: "#333" }}>
    <Search
      placeholder={StringConstants.SEARCH_ORDERS}
      enterButton={StringConstants.SEARCH}
      size="large"
      style={{ width: "300px", marginRight: "20px", borderRadius: "8px" }}
    />
    <Button
      type="default"
      style={{ marginRight: "10px", borderRadius: "8px" }}
      onClick={() => sortOrders("ALL")}
    >
      {StringConstants.ALL_ORDERS}
    </Button>
    <Button
      type="default"
      style={{ marginRight: "10px", borderRadius: "8px" }}
      onClick={() => sortOrders("PROCESSING")}
    >
      {StringConstants.PROCESSING}
    </Button>
    <Button
      type="default"
      style={{ marginRight: "10px", borderRadius: "8px" }}
      onClick={() => sortOrders("IN_TRANSIT")}
    >
      {StringConstants.IN_TRANSIT}
    </Button>
    <Button
      type="default"
      style={{ marginRight: "10px", borderRadius: "8px" }}
      onClick={() => sortOrders("DELIVERED")}
    >
      {StringConstants.DELIVERED}
    </Button>
    <Button
      type="default"
      style={{ marginRight: "10px", borderRadius: "8px" }}
      onClick={() => sortOrders("CANCELLED")}
    >
      {StringConstants.CANCELLED}
    </Button>
  </div>
);

export default OrderViewNavbar;
