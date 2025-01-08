import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

class RefundService {
  async getAllRefundRequests() {
    try {
      const response = await axios.get(`${ServiceConstants.REFUNDS}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching refund requests:", error);
      throw error;
    }
  }

  async updateRefundStatus(refundRequest) {
    try {
      const response = await axios.put(
        `${ServiceConstants.ORDERS}/updateRefundStatus`,
        refundRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error updating refund status:", error);
      throw error;
    }
  }
}
const refundService = new RefundService();
export default refundService;
