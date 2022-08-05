import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { authorizeAirtime, initiateAirtimePurchase } from "../../helpers/utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isLoading: false,
  data: null,
  errorMsg: null,
  thereIsError: false,
  isInnitiated: false,
  hasAuthorizePaynment: false,
}

const setAirtimeInfo = async(AirtimeInfo) => {
  await AsyncStorage.setItem('airtimeInfo' , JSON.stringify(AirtimeInfo))
}

export const initiateUserAirtimePurchase = createAsyncThunk("airtime/purchase", async (action, thunkAPI) => {
  const token = JSON.parse(action.token);
  // console.log('This is ',action.airtimePayload);

  return axiosInstance.post(`${initiateAirtimePurchase}`, action.airtimePayload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res.data);
    if (!res.data) {
      thunkAPI.dispatch(setErrorMsg("An error occured please try again later"))
    }else if (res.data.status === true) {
      thunkAPI.dispatch(setIsInitiated());
      setTimeout(() => {
        thunkAPI.dispatch(setIsInitiated());
      }, 5000);
      setAirtimeInfo(res.data.result[0]);
    }else{
      thunkAPI.dispatch(setErrorMsg(res.data.error_message));
    }
  }).catch(err => console.log(err.response));

})

export const authorizeUserAirtime = createAsyncThunk("authorize/airtime", async(action, thunkAPI) => {
  const token = JSON.parse(action.token);
  const data = action.data;
  const pin = action.pin;
  // console.log('This is the action from authorizeUserAirtime',action);
  
  return axiosInstance.post(`${authorizeAirtime}${data.reference}`, {pin}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res.data);
    if (!res.data) {
      alert('Seems you are not conected to the internet, please try connect to an internet')
    }
    if (res.data.status === false) {
      thunkAPI.dispatch(setErrorMsg(res.data.error_message));
    }else{
      thunkAPI.dispatch(setHasAuthorizePayment());
      setTimeout(() => {
        thunkAPI.dispatch(setHasAuthorizePayment());
      }, 5000)
    }
  }).catch(err => {
    console.log(err.response);
  })
});


const AirtimePaymentSlice = createSlice({
  name: 'airtime',
  initialState,
  reducers: {
    setIsInitiated: (state) => {
      state.isInnitiated = !state.isInnitiated;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
    setHasAuthorizePayment: (state) => {
      state.hasAuthorizePaynment = !state.hasAuthorizePaynment;
    },
    setErrorMsgNull: (state) => {
      state.errorMsg = null;
      console.log('message as been removed');
    }
  },
  extraReducers: {
    [initiateUserAirtimePurchase.rejected]: (state) => {
      state.isLoading = false;
    },
    [initiateUserAirtimePurchase.pending]: (state) => {
      state.isLoading = true;
    },
    [initiateUserAirtimePurchase.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [authorizeUserAirtime.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [authorizeUserAirtime.rejected]: (state) => {
      state.isLoading = false;
    },
    [authorizeUserAirtime.pending]: (state) => {
      state.isLoading = true;
    }
  }
});

export const {setIsInitiated, setHasAuthorizePayment, setErrorMsg, setErrorMsgNull} = AirtimePaymentSlice.actions;
export default AirtimePaymentSlice.reducer;
