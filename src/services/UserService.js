import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";

class UserService {
  async getUserById(userId) {
    try {
      console.log("Fetching user data for user ID:", userId);
      const response = await axios.get(ServiceConstants.USER + `/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      console.log("Creating user:", user);
      return await axios.post(ServiceConstants.USER, user);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
