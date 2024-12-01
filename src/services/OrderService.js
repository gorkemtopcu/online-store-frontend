import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const OrderService = {
  completePurchase: async (uid, orderTotal, addressDetails, paymentDetails, selectedProductsData) => {
    const orderDetails = {
      uid,
      orderTotal,
      address: addressDetails,
      payment: paymentDetails,
      products: selectedProductsData,
    };

    try {
      const response = await axios.post(
        `${ServiceConstants.ORDERS}${ServiceConstants.CREATE}`, 
        orderDetails
      );

      if (typeof response.data === "string" && response.data.includes("ID:")) {
        const orderId = response.data.split("ID:")[1].trim();
        return orderId;
      } else {
        console.error("Unexpected response format:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error completing purchase:", error);
      return null;
    }
  },

  fetchInvoice: async (orderId) => {
    const url = `${ServiceConstants.INVOICES}/${orderId}`;
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      return window.URL.createObjectURL(blob); 
    } catch (error) {
      console.error("Error fetching invoice:", error);
      throw error;
    }
  },
};

export default OrderService;
