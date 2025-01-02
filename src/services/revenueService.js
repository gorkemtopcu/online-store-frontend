import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const RevenueService = {
  getRevenueReport: async (startDate, endDate) => {
    try {
      const response = await axios.post(
        `${ServiceConstants.ADMIN}${ServiceConstants.REVENUE_REPORT}`,
        {
          startDate,
          endDate,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching revenue report:", error);
      throw error;
    }
  },
};

export default RevenueService;
