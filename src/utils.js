import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppStore } from "../stores/index.js";
const appStore = useAppStore();
/**
 * 將地址轉換為經緯度
 * @param {string} address - 要查詢的地址
 * @returns {Promise<Object>} 包含經緯度的物件 { lat, lng }
 */
export const geocodeAddress = async (address) => {
  const apiKey = '70e33b2171f14379a4ab0d23ce25e3f5'

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&countrycode=TW`;

  try {
    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error during geocoding:', error);
    throw error;
  }
};

export const logoutUser = () => {
  Cookies.remove('googleData');
  Cookies.remove('fbData');
  appStore.clearUserData()
}