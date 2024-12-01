import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const CategoryService = {
    addCategory:  async (category) => {
        try {
            return await axios.post(ServiceConstants.CATEGORY, category);
        } catch (error) {
            throw error;
        }
    },
    getCategories: async () => {
        try {
            return await axios.get(ServiceConstants.CATEGORY + ServiceConstants.GET_ALL);
        } catch (error) {
            throw error;
        }
    },
    deleteCategory: async (id) => {
        try {
            return await axios.delete(ServiceConstants.CATEGORY + `/${id}`);
        } catch (error) {
            throw error;
        }
    }

};

export default CategoryService;
