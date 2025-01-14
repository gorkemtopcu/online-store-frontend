import React, { useState, useEffect } from "react";
import useOrderManagement from "../hooks/OrderManagementHook";
import OrderTable from "./components/OrderTable";
import OrderStatusModal from "./components/OrderStatusModal";
import SearchInput from "components/input/SearchInput";

const OrderManagementView = () => {
  const {
    orders,
    isEditModalVisible,
    editingOrder,
    newStatus,
    setNewStatus,
    setIsEditModalVisible,
    handleEdit,
    handleSave,
  } = useOrderManagement();

  const [searchValue, setSearchValue] = useState(""); // Store the search value
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    setFilteredOrders(orders); // Ensure initial orders are set
  }, [orders]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); // Update search value
  };

  // Handle search action (when pressing enter or clicking the search button)
  const handleSearch = () => {
    if (searchValue.trim() === "") {
      // If search value is empty, reset to all orders
      setFilteredOrders(orders);
    } else {
      // Filter orders based on search value
      const filtered = orders.filter(
        (order) => order.orderId.toString().includes(searchValue) // Assuming you're filtering by orderId, adjust as needed
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div>
      {/* Add the SearchInput component */}
      <SearchInput
        value={searchValue}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        placeholder="Search orders..." // Optional placeholder
      />

      {/* Add spacing between the search bar and the table */}
      <div style={{ marginBottom: "20px" }}></div>

      {/* Pass filteredOrders instead of orders */}
      <OrderTable orders={filteredOrders} onEdit={handleEdit} />

      <OrderStatusModal
        visible={isEditModalVisible}
        order={editingOrder}
        status={newStatus}
        onStatusChange={setNewStatus}
        onSave={handleSave}
        onCancel={() => setIsEditModalVisible(false)}
      />
    </div>
  );
};

export default OrderManagementView;
