import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isLoading } from "expo-font";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import {
  baseUrl,
  refreshTokenRoute,
  walletDetails,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isFetched: false,
  isLoading: false,
  data: {},
  errorMessage: null,
  isThere401Response: false,
};

const SetUserResponse = async (userData) => {
  console.log("it is setting repsonse", userData);
  await AsyncStorage.setItem("firstName", userData.first_name);
  await AsyncStorage.setItem("lastName", userData.last_name);
};

const setUserToken = async (tokens) => {
  console.log('sssssss',tokens);
  await AsyncStorage.setItem("token", JSON.stringify(tokens.newToken));
  await AsyncStorage.setItem("refreshToken", JSON.stringify(tokens.newRefreshedToken));
};

export const FetchUserProfile = createAsyncThunk(
  "fetch/user",
  async (action, thunkAPI) => {
    // console.log("it is working", action);
    const token = JSON.parse(action);

    return axiosInstance
      .get(`${walletDetails}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("there wasOgw", res.data)
        if (!res.data) {
          thunkAPI.dispatch(setThereIs401Response());
          // thunkAPI.dispatch(refreshUserToken());
        } else if (res.data.status === false) {
          thunkAPI.dispatch(setThereIs401Response());
        }else{
          thunkAPI.dispatch(setUserData(res.data.result[0]));
        SetUserResponse(res.data.result[0]);
        }
        
      })
      .catch((err) => {
        console.log(err);
        // console.log("there was an error from userSlice");
        // thunkAPI.dispatch(refreshUserToken());
      });
  }
);

// export const refreshUserToken =
//   ("refreshToken/user",
//   async (action, thunkAPI) => {
//     const refreshedToken = await AsyncStorage.getItem("refreshToken");
//     const refreshToken = JSON.parse(refreshedToken);


//     console.log("From refresh token", refreshToken);

//     return axiosInstance
//       .post(`${refreshTokenRoute}`, { refreshToken })
//       .then((res) => {
//         console.log("this is from the useer profile slice", res.data);

//         if (res.data.status === false) {
//           thunkAPI.dispatch(setThereIs401Response());
//         }else{
//           const newToken = res.data[0].token;
//           const newRefreshToken = res.data[0].refresh_token;
//           // await AsyncStorage.setItem('token', JSON.stringify(newToken));
//           // await AsyncStorage.setItem('refreshToken', JSON.stringify(newRefreshToken));
//           const tokens = {
//             newToken: newToken,
//             newRefreshedToken: newRefreshToken,
  
//           }
//           setUserToken(tokens)
//         }
//       })
//       .catch((err) => {
//         console.log(err.response);
//       });
//   });

const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState,

  reducers: {
    setUserProfile: (state, action) => {
      state.data = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setThereIs401Response: (state) => {
      state.isThere401Response = true;
    },
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [FetchUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [FetchUserProfile.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [FetchUserProfile.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  setUserProfile,
  setUserData,
  setErrorMessage,
  setThereIs401Response,
} = UserProfileSlice.actions;

export default UserProfileSlice.reducer;
