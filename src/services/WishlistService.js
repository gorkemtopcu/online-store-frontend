import axios from "axios";
import ServiceConstants from "../constants/ServiceConstants";

const WishlistService = {
  getAll: async () => {
    try {
      return await axios.get(
        ServiceConstants.WISHLIST + ServiceConstants.GET_ALL
      );
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  },
  getById: async (id) => {
    try {
      console.log(
        ServiceConstants.WISHLIST + ServiceConstants.GET_BY_ID + `/${id}`
      );
      return await axios.get(
        ServiceConstants.WISHLIST + ServiceConstants.GET_BY_ID + `/${id}`
      );
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  },
  addToWishlist: async (productId) => {
    try {
      console.log(productId);
      return await axios.post(ServiceConstants.WISHLIST, productId);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  },
  removeFromWishlist: async (productId) => {
    try {
      console.log(
        ServiceConstants.WISHLIST + ServiceConstants.REMOVE + `/${productId}`
      );
      return await axios.delete(
        ServiceConstants.WISHLIST + ServiceConstants.REMOVE + `/${productId}`
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  },
};

export default WishlistService;