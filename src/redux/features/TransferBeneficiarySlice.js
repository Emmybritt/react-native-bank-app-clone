import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { getTransferBeneficiary } from "../../helpers/utils/Apiroutes/ServerRoutes";



export const getTransferBeneficiaries = createAsyncThunk("transfer/beneficiaries", async (action, thunkAPI) => {
  const token = await AsyncStorage.getItem('token');

  return axiosInstance.get(getTransferBeneficiary, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`
    }
  }).then((res) => {
    if (res.data.status) {
      let results = res.data.result;
      thunkAPI.dispatch(setTransferBeneficiaries(results))
    }else{
      thunkAPI.dispatch(setErrorMesseages(res.data.error_message))
    }
  }).catch(err => {
    console.log(err);
  })
 

})



const initialState = {
  isLoading: false,
  TransferBeneficiaries: null,
  errorMsg: null
}


const TransferBeneficiary = createSlice({
  name: 'transferbeneficiary',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true
    },
    setTransferBeneficiaries: (state, {payload}) => {
      state.TransferBeneficiaries = payload;
    },
    setErrorMesseages: (state, {payload}) => {
      state.errorMsg = payload;
    }
  },
  extraReducers: {
    [getTransferBeneficiaries.pending]: (state) => {
      state.isLoading = true;
    },
    [getTransferBeneficiaries.rejected]: (state) => 
    {
      state.isLoading = false;
    },
    [getTransferBeneficiaries.fulfilled]: (state) => {
      state.isLoading = false;
    }
  }
});


export default TransferBeneficiary.reducer;
export const {setTransferBeneficiaries, setErrorMesseages} = TransferBeneficiary.actions;


