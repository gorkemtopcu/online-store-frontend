import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";
const OrderService = {
  completePurchase: (
    uid,
    orderTotal,
    addressDetails,
    paymentDetails,
    selectedProductsData
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
      .then((response) => response.data)
      .catch((error) => false);
  },

  getOrders: (uid) => {
    return axios
      .get(ServiceConstants.ORDERS + ServiceConstants.GET_BY_USER_ID + uid)
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
  cancelOrder: async (orderId) => {
    try {
      const response = await axios.delete(
        ServiceConstants.ORDERS + ServiceConstants.CANCEL + orderId
      );
      console.log("Cancel order response:", response); // Log the response
      return response.data;
    } catch (error) {
      console.error("Error cancelling order:", error.response ? error.response.data : error.message);
      return false;
    }
  },

  requestRefund: async (refundRequest) => {
    try {
      const response = await axios.post(
        `${ServiceConstants.ORDERS}/requestRefund`,
        refundRequest
      );
      console.log("Request refund response:", response); // Log the response
      return response.data;
    } catch (error) {
      console.error("Error requesting refund:", error.response ? error.response.data : error.message);
      return false;
    }
  },

};


export default OrderService;
