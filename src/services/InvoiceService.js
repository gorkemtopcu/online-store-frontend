import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const InvoiceService = {
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

  fetchInvoices: async (startDate = null, endDate = null) => {
    let url = ServiceConstants.INVOICES;

    if (startDate || endDate) {
      const params = [];
      if (startDate) params.push(`startDate=${startDate}`);
      if (endDate) params.push(`endDate=${endDate}`);
      url = `${url}?${params.join("&")}`;
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  },
};

export default InvoiceService;
