import axios from "axios";
import ServiceConstants from "constants/ServiceConstants";
import exceptionService from "./error/ExceptionService";

class UserService {
  async getUserById(userId) {
    try {
      console.log("Fetching user data for user ID:", userId);
      const response = await axios.get(ServiceConstants.USER + `/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      exceptionService.handleException(error);
    }
  }

  async createUser(user) {
    try {
      console.log("Creating user:", user);
      return await axios.post(ServiceConstants.USER, user);
    } catch (error) {
      console.error("Error creating user:", error);
      exceptionService.handleException(error);
    }
  }
}

const userService = new UserService();
export default userService;
