import axios from "axios";
import ServiceConstants from "../constants/ServiceConstants";

const ProductService = {
  getAll: async () => {
    try {
      return await axios.get(
        ServiceConstants.PRODUCTS + ServiceConstants.GET_ALL
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  getAllPriced: async () => {
    try {
      return await axios.get(
        ServiceConstants.PRODUCTS + ServiceConstants.GET_ALL_PRICED
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  deleteProduct: async (id) => {
    try {
      return await axios.delete(
        ServiceConstants.PRODUCTS + `/${id}`
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
  getById: async (id) => {
    try {
      console.log(
        ServiceConstants.PRODUCTS + ServiceConstants.GET_BY_ID + `/${id}`
      );
      return await axios.get(
        ServiceConstants.PRODUCTS + ServiceConstants.GET_BY_ID + `/${id}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addProduct: async (product) => {
    try {
      console.log(product);
      return await axios.post(ServiceConstants.PRODUCTS, product);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
  getBestSellers: async () => {
    try {
      return await axios.get(
        ServiceConstants.PRODUCTS + ServiceConstants.BEST_SELLERS
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  getNewArrivals: async () => {
    try {
      return await axios.get(
        ServiceConstants.PRODUCTS + ServiceConstants.NEW_ARRIVALS
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  updatePrice: async (id, price) => {
    try {
      return await axios.put(
        ServiceConstants.PRODUCTS + ServiceConstants.CHANGE_PRICE + `/${id}/${price}`
      );
    } catch (error) {
      console.error("Error updating price:", error);
    }
  }
};

export default ProductService;
