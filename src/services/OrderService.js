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

    console.log("Order Details:", orderDetails);
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
};

export default OrderService;
