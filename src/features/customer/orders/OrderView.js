import React, { useEffect, useState } from "react";
import OrderService from "services/OrderService";
import useUserStore from "context/UserStore";
import OrderViewNavbar from "./components/OrderViewNavbar";
import OrderList from "./components/OrderList";
import LoadingSpinner from "components/spinner/LoadingSpinner";
import StringConstants from "constants/StringConstants";

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Fetch orders when the component mounts
    OrderService.getOrders(currentUser.uid)
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          b.orderDate.localeCompare(a.orderDate)
        );
        setOrders(sortedData);
        setFilteredOrders(sortedData); // Initialize filtered orders with all orders
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      });
  }, [currentUser]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <OrderViewNavbar orders={orders} setFilteredOrders={setFilteredOrders} />
      {loading ? (
        <LoadingSpinner message={StringConstants.LOADING} />
      ) : (
        <OrderList orders={filteredOrders} />
      )}
    </div>
  );
};

export default OrderView;
