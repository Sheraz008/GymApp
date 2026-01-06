import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

HTTP_CLIENT.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging
    console.log('--- API Request ---');
    console.log('URL:', config.baseURL ? config.baseURL + config.url : config.url);
    console.log('Method:', config.method?.toUpperCase());
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.log('-------------------');

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for debugging and potentially handling 401s
HTTP_CLIENT.interceptors.response.use(
  (response) => {
    console.log('--- API Response ---');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('--------------------');
    return response;
  },
  async (error) => {
    console.log('--- API Error ---');
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
    console.log('-----------------');
    
    if (error?.response?.status === 401) {
      // Handle logout or token refresh if needed
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user_data");
    }
    return Promise.reject(error);
  },
);

export default HTTP_CLIENT;
