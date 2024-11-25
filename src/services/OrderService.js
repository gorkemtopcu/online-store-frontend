import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const OrderService = {
  completePurchase: (
    addressDetails,
    paymentDetails,
    selectedProducts,
    clearCart
  ) => {
    const orderDetails = {
      address: addressDetails,
      payment: paymentDetails,
      products: selectedProducts,
    };

    return axios
      .post(ServiceConstants.ORDERS, orderDetails)
      .then((response) => true)
      .catch((error) => false);
  },
};

export default OrderService;
