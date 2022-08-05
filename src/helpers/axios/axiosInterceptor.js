import axios from 'axios'

import {baseUrl, refreshTokenRoute} from '../utils/Apiroutes/ServerRoutes'

import AsyncStorage from '@react-native-async-storage/async-storage'




let headers = {}
let params = {}

const axiosInstance = axios.create({
  baseURL : baseUrl,
  headers,
  params
})




axiosInstance.interceptors.response.use(
  (response)=>{
    return response;
  },
  async (error)=>{

    const originalRequest = error.config;
    // console.log('This is the rerror responses from as',error.response.status);

    // console.log('This is the response statussss',typeof error.response.status);
    if(error.response){
      if(error.response.status === 401){
        // console.log('There is an 401 error');
        try {
          const refresh = await AsyncStorage.getItem('refreshToken');
          const refreshToken = JSON.parse(refresh)
         

         const res = await axios.post(`${baseUrl}${refreshTokenRoute}`, {refreshToken});
         

        //  console.log('This is the ressssss.data2', res.data);
         if (res.data.status === true) {
          await AsyncStorage.removeItem('token');
          const newToken = JSON.stringify(res.data.result[0].token);
          const newRefreshToken = JSON.stringify(res.data.result[0].refresh_token)

        //  console.log('This is the refresh token from the axios', newToken);
        

         await AsyncStorage.setItem('token', newToken)

         await AsyncStorage.setItem('refreshToken', newRefreshToken);
         }
         //08114445886

         

         if(res.data.status){
           return await axiosInstance(originalRequest);
         }



        }
        catch(error){
          console.log(error);
        }
      }
    }
    return Promise.resolve(error)
  }
)
export default axiosInstance;