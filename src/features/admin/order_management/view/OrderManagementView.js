import React from "react";
import useOrderManagement from "../hooks/OrderManagementHook";
import OrderTable from "./components/OrderTable";
import OrderStatusModal from "./components/OrderStatusModal";

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

  return (
    <div>
      <OrderTable orders={orders} onEdit={handleEdit} />
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
