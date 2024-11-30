import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

const CategoryService = {
    addCategory:  async (category) => {
        try {
            return await axios.post(ServiceConstants.CATEGORY, category);
        } catch (error) {
            throw error;
        }
    }
};

export default CategoryService;
