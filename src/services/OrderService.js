import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const OrderService = {
  completePurchase: (
    uid,
    orderTotal,
    addressDetails,
    paymentDetails,
    selectedProductsData,
    clearCart
  ) => {
    const orderDetails = {
      uid: uid,
      orderTotal: orderTotal,
      address: addressDetails,
      payment: paymentDetails,
      products: selectedProductsData,
    };
    return axios
      .post(ServiceConstants.ORDERS + ServiceConstants.CREATE, orderDetails)
      .then((response) => true)
      .catch((error) => false);
  },

  getOrders: (uid) => {
    return axios
      .get(ServiceConstants.ORDERS + ServiceConstants.GET_BY_USERID + uid)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  getAllOrders: () => {
    return axios
      .get(ServiceConstants.ORDERS + ServiceConstants.GET_ALL)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },

  updateOrderStatus: (orderId, newStatus) => {
    const updatedOrder = {
      orderId: orderId,
      orderStatus: newStatus,
    };
    return axios
      .put(
        ServiceConstants.ORDERS + ServiceConstants.UPDATE_STATUS,
        updatedOrder
      )
      .then((response) => response.data)
      .catch((error) => console.log(error));
  },
};

export default OrderService;
