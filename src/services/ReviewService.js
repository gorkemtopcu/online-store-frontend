import axios from "axios";
import ServiceConstants from "../constants/ServiceConstants";

const ReviewService = {
  addReview: async (review) => {
    try {
      return await axios.post(
        ServiceConstants.REVIEW + ServiceConstants.ADD,
        review
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  deleteReview: async (reviewId) => {
    try {
      return await axios.delete(
        ServiceConstants.REVIEW + ServiceConstants.DELETE + reviewId
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  getReviewsByProductId: async (productId) => {
    try {
      return await axios.get(
        ServiceConstants.REVIEW + ServiceConstants.GET_BY_PRODUCT_ID + productId
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  getReviewsByUserId: async (userId) => {
    try {
      return await axios.get(
        ServiceConstants.REVIEW + ServiceConstants.GET_BY_USER_ID + userId
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  getAllComments: async () => {
    try {
      return await axios.get(ServiceConstants.REVIEW + ServiceConstants.GET_ALL);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  getPendingReviews: async () => {
    try {
      return await axios.get(ServiceConstants.REVIEW + ServiceConstants.GET_PENDING);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  approveReview: async (reviewId) => {
    try {
      return await axios.put(
        ServiceConstants.REVIEW + ServiceConstants.APPROVE + reviewId
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  declineReview: async (reviewId) => {
    try {
      return await axios.put(
        ServiceConstants.REVIEW + ServiceConstants.DECLINE + reviewId
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};

export default ReviewService;
