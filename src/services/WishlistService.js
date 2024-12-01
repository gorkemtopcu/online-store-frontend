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
  getById: async (userId) => {
    try {
      console.log(
        ServiceConstants.WISHLIST + `/${userId}`
      );
      return await axios.get(
        ServiceConstants.WISHLIST + `/${userId}`
      );
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  },
  addToWishlist: async (userId, productId) => {
    try {
      const wishlistPayload = { userId, productId };
      console.log("Adding product to wishlist:", wishlistPayload);
      const response = await axios.post(
        ServiceConstants.WISHLIST,
        wishlistPayload, // Ensure the payload is formatted as JSON
        {
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header
          },
        }
      );
      console.log("Response:", response);
      return response;
    } catch (error) {
      console.error("Error adding product to wishlist:", error.response ? error.response.data : error.message);
    }
  },
  removeFromWishlist: async (wishlistId) => {
    try {
      console.log("Removing item from wishlist:", wishlistId);
      const response = await axios.delete(
        ServiceConstants.WISHLIST + `/remove/${wishlistId}`
      );
      console.log("Response:", response);
      return response;
    } catch (error) {
      console.error("Error removing product from wishlist:", error.response ? error.response.data : error.message);
    }
  },
};

export default WishlistService;