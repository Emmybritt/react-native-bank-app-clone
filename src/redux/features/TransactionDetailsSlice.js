import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const fetchSingleTransactionDetails = createAsyncThunk("single/transactionDetails", async(action, thunkAPI) => {
  const token = await AsyncStorage.getItem("token");
  return axiosInstance.get(`api/Transaction/${action}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`
    }
  }).then((res) => {
    console.log(res.data);
    if (res.data.status) {
      thunkAPI.dispatch(setTransactionDetails(res.data.result[0]));
    }else{
      thunkAPI.dispatch(setErrorMessage(res.data.error_message));
    }
  }).catch(err => {
    console.log(err);
  })
})

const initialState = {
  isLoding: false,
  errorMessage: null,
  transactionDetails: null,
}
const TransactionDetailsSlice = createSlice({
  name: 'transactionDetails',
  initialState,

  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setTransactionDetails: (state, action) => {
      state.transactionDetails = action.payload;
    }
  },
  extraReducers: {
    [fetchSingleTransactionDetails.rejected]: (state) => {
      state.isLoding = false;
    },
    [fetchSingleTransactionDetails.pending]: (state) => {
      state.isLoding = true;
    },
    [fetchSingleTransactionDetails.fulfilled]: (state) => {
      state.isLoding = false;
    }
  }
});



export const {setErrorMessage, setTransactionDetails} = TransactionDetailsSlice.actions;
export default TransactionDetailsSlice.reducer;