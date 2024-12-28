import axios from "axios";

// Backend API'nin temel URL'si
const API_BASE_URL = "http://localhost:8081"; // Eğer backend farklı bir domain veya portta çalışıyorsa bunu değiştirin

/**
 * Revenue Report API çağrısı
 * @param {string} startDate - Rapor başlangıç tarihi (YYYY-MM-DD formatında)
 * @param {string} endDate - Rapor bitiş tarihi (YYYY-MM-DD formatında)
 * @returns {Promise<Object>} Backend'den dönen revenue report verisi
 */
export const getRevenueReport = async (startDate, endDate) => {
  try {
    // Backend'e POST isteği yapılıyor
    const response = await axios.post(`${API_BASE_URL}/admin/revenue-report`, {
      startDate,
      endDate,
    });

    // API'den gelen veriyi döndürüyoruz
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    throw error; // Hatanın üst katmanda ele alınabilmesi için tekrar fırlatılıyor
  }
};

export default {
  getRevenueReport,
};