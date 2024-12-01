import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/notifications";

export const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mark-as-read/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
