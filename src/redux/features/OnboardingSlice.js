import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onboardingNavigation } from "../../helpers/utils/Apiroutes/ServerRoutes";

const initialState = {
  isLoading: false,
  data: null,
  isFetched: false,
}

export const FetcheOnbording = createAsyncThunk("user/onboard", async(action, thunkAPI) => {
  const token = AsyncStorage.getItem("token");
  const parsedToken = JSON.parse(token);
  console.log(parsedToken);
  return axiosInstance.get(`${onboardingNavigation}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res.data);
  }).catch(err => {
    console.log(err.response);
  })
})
const onBordingSlice = createSlice({
  name: "onBording",
  initialState,
  reducers: {

  },
  extraReducers: {

  }
});

export const {} = onBordingSlice.actions;
export default onBordingSlice.reducer;