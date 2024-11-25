import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const OrderService = {
  completePurchase: (
    uid,
    addressDetails,
    paymentDetails,
    selectedProductIds,
    clearCart
  ) => {
    const orderDetails = {
      uid: uid,
      address: addressDetails,
      payment: paymentDetails,
      productIds: selectedProductIds,
    };
    console.log("Order Details:", selectedProductIds);

    return axios
      .post(ServiceConstants.ORDERS + ServiceConstants.CREATE, orderDetails)
      .then((response) => true)
      .catch((error) => false);
  },
};

export default OrderService;
