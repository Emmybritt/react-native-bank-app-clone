import axiosInstance from "../axios/axiosInterceptor";
import { onboardingNavigation } from "../utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";






export const OnboardingNavigation = async ()=>{


  // const onboardingDatas = useSelector(state => state.onBoarding.data);

  // console.log(onboardingDataso);

  // const dispatch = useDispatch();
  // dispatch(FetcheOnbording())



  const token = await AsyncStorage.getItem('token')
  const parsedToken = JSON.parse(token);
  // console.log(parsedToken);
 

  try{
  
    const res = await axiosInstance.get(`${onboardingNavigation}`,{

      headers:{
        'Authorization' : `Bearer ${parsedToken}`
      }
    })

     const routeData = res.data.result[0];
     console.log(routeData);
   
    
     return routeData;

  }

  catch(error){

    return null;


  }


}