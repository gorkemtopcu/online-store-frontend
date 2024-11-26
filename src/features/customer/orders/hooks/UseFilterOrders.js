const { default: StringConstants } = require("constants/StringConstants");
const { useMemo } = require("react");

// Hook to define filtering strategies
const useFilterOrders = (orders) => {
  return useMemo(
    () => ({
      [StringConstants.PROCESSING]: () =>
        orders?.filter((order) => order.orderStatus === "PROCESSING"),
      [StringConstants.IN_TRANSIT]: () =>
        orders?.filter((order) => order.orderStatus === "IN_TRANSIT"),
      [StringConstants.DELIVERED]: () =>
        orders?.filter((order) => order.orderStatus === "DELIVERED"),
      [StringConstants.CANCELLED]: () =>
        orders?.filter((order) => order.orderStatus === "CANCELLED"),
      [StringConstants.ALL]: () => (orders ? [...orders] : []),
    }),
    [orders]
  );
};

export default useFilterOrders;
