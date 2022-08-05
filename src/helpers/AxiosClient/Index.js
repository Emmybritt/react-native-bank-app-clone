// const axios = require('axios');
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl, refreshTokenRoute } from '../utils/Apiroutes/ServerRoutes';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs'


async function refreshAccessToken() {
  const userRefreshToken = await AsyncStorage.getItem("refreshToken");
  const res = await axios.post(`${baseUrl}${refreshTokenRoute}`, {userRefreshToken});
  if (res.data.status) {
    let newUserToken = JSON.stringify(res.data[0].token);
    let newUserRefreshToken = JSON.stringify(res.data[0].refresh_token)

    await AsyncStorage.setItem("token", newUserToken);
    await AsyncStorage.setItem("refreshToken", newUserRefreshToken);
    return newUserToken;
  }
}


const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    const userRefreshToken = await AsyncStorage.getItem("refreshToken");
    const accessToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${accessToken}`
    const user = jwt_decode(token);
    console.log('user', user);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;
    const response = await axios.post(`${baseUrl}${refreshTokenRoute}`, {
      refreshToken: JSON.parse(userRefreshToken)
    });
    await AsyncStorage.setItem('token', response.data[0].token);
    await AsyncStorage.setItem('refreshToken', response.data[0].refresh_token);

    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptor for API calls
axiosInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 || error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();            
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
});