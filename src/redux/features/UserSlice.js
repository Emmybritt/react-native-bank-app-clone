import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../helpers/AxiosClient/Index";
import {
  newDeviceSignIn,
  resendSignInCode,
  verifySignInCode,
  walletDetails,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { FetchUserProfile } from "./UserProfileSlice";

const initialState = {
  isRegisterLoading: false,
  isLoginLoading: false,
  isEmailLoading: false,
  errorMsg: null,
  isRegistered: false,
  isLoggedIn: false,
  successMessage: null,
  isSendingUnlockingCode: false,
  hasVerifiedEmail: false,
};

const saveToken = async (token) => {
  const AccessToken = JSON.stringify(token);
  await AsyncStorage.setItem("token", AccessToken);
};
const setRefreshToken = async (refreshToken) => {
  const RefreshToken = JSON.stringify(refreshToken);
  await AsyncStorage.setItem("refreshToken", RefreshToken);
};
const storeUserResponse = async (data) => {
  const userData = JSON.stringify(data);
  await AsyncStorage.setItem("response", userData);
  // await AsyncStorage.setItem('signinMail' , userData.userName)
};
const storeUserEmail = async (data) => {
  const userData = JSON.stringify(data);
  await AsyncStorage.setItem("signinMail", userData);
};

const setResponseData = async (response) => {
  const userResponse = JSON.stringify(response);
  await AsyncStorage.setItem("userResponseDatas", userResponse);
};

export const registerUser = createAsyncThunk(
  "register/user",
  async (action, thunkAPI) => {
    // console.log(action);
    return axiosInstance.post("api/Auth/sign-up", action).then((res) => {
      if (res.data.status === false) {
        const error = res.data.error_message;
        thunkAPI.dispatch(setError(error));
      } else {
        thunkAPI.dispatch(setIsRegistered());
        thunkAPI.dispatch(setErrorMsgNull());
        saveToken(res.data.result[0].token);
        setRefreshToken(res.data.result[0].refresh_token);
        storeUserResponse(res.data.result[0]);
        console.log("This is coming from line 61 userSlice.js", res.data);
        // 07081475750

        thunkAPI.dispatch(setUserName(res.data.result[0].username));
        thunkAPI.dispatch(storeUserAccessToken(res.data.result[0].token));
        thunkAPI.dispatch(
          storeUserAccessRefreshToken(res.data.result[0].refresh_token)
        );

          axiosInstance.get(`${walletDetails}`, {
            headers: {
              Authorization: `Bearer ${res.data.result[0].token}`,
            },
          }).then((response) => {
            if (response.data.status) {
              setResponseData(response.data.result[0]);
            }else{
              alert('Something went wrong please try again')
            }
          })

        const user_id = res.data.result[0].user_id;
        const username = res.data.result[0].username;
        thunkAPI.dispatch(
          setUserData({ user_id: user_id, username: username })
        );
      }
    });
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async (action, thunkAPI) => {
    return axiosInstance.post(`${newDeviceSignIn}`, action).then((res) => {
      if (res.data.status === false) {
        const error = res.data.error_message;
        thunkAPI.dispatch(setError(error));
      } else {
        console.log('From userSlice.js on line 86', res.data);
        storeUserEmail(action.username);
        // console.log("This", res.data);
        // console.log("This is email kdkdndkdnkdnk", action);
        thunkAPI.dispatch(setIsLoggedIn());
        setRefreshToken(res.data.result[0].refresh_token);
        saveToken(res.data.result[0].token);
        storeUserResponse(res.data.result[0]);
        storeUserToken();
      }
    });
  }
);

export const VerifyEMailAddress = createAsyncThunk(
  "verify/email",
  async (action, thunkAPI) => {
    const token = await AsyncStorage.getItem("token");
    console.log('This is action from line 119 userSlice.js', action);

    return axiosInstance
      .post(
        `${verifySignInCode}?code=${action.code}&user_email=${action.userName}`,
        {}
      )
      .then((res) => {
        // console.log('from userSlice.js on line 111', res.data);
        if (res.data.status) {
          storeUserResponse(res.data.result[0]);
          setRefreshToken(res.data.result[0].refresh_token);
          saveToken(res.data.result[0].token);
          var userToken = res.data.result[0].token;
          
        }
        if (res.data.status === false) {
          thunkAPI.dispatch(setError(res.data.error_message));
          setTimeout(() => {
            thunkAPI.dispatch(setErrorMsgNull());
          }, 6000);
        } else {
          // Get user wallet details starts here
          console.log('This is a userToiken from verifyemail line 140', userToken);
          axiosInstance
            .get(`${walletDetails}`, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            })
            .then((response) => {
              
              if (response.data) {
                if (response.data.status === false) {
                  alert("Sorry something went wrong please try again");
                } else {
                  // console.log("there was no error", res.data.result[0]);
                  thunkAPI.dispatch(setHasVerifiedEmail());
                  setResponseData(response.data.result[0]);
                }
              } else {
                alert("Sorry something went wrong please try again");
              }
            });
        }
      });
  }
);

export const ResendEmailVerificationCode = createAsyncThunk(
  "resend/emailCode",
  (action, thunkAPI) => {
    const email = JSON.parse(action);
    console.log("From resend email", email);
    return axiosInstance
      .post(`${resendSignInCode}?user_email=${email}`, {})
      .then((res) => {
        if (res.data.status === true) {
          thunkAPI.dispatch(setError(res.data.success_message));
        } else {
          thunkAPI.dispatch(setError(res.data.error_message));
          setTimeout(() => {
            thunkAPI.dispatch(setErrorMsgNull());
          }, [6000]);
        }
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {},
    setError: (state, action) => {
      state.errorMsg = action.payload;
    },
    setLoginSuccessMessage: (state, action) => {},
    setErrorMsgNull: (state, action) => {
      state.errorMsg = null;
    },
    setUserData: (state, action) => {
      state.data = action.payload;
      console.log(action.payload);
    },

    setIsRegistered: (state, action) => {
      state.isRegistered = true;
    },
    storeUserAccessToken: async (state, action) => {
      // console.log(action);
      // await AsyncStorage.setItem("token", JSON.stringify(action.payload));
    },
    storeUserAccessRefreshToken: async (state, action) => {
      // console.log(action);
      // try {
      //   await AsyncStorage.setItem(
      //     'refreshToken',action.payload
      //   );
      // } catch (error) {
      // }
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setUserName: async (state, action) => {
      // console.log(action);
      // state.signinMail = await AsyncStorage.setItem("signinMail", JSON.stringify(action.payload));
    },
    setHasVerifiedEmail: (state) => {
      state.hasVerifiedEmail = true;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isRegisterLoading = false;
      state.data = action.payload;
    },
    [registerUser.pending]: (state) => {
      state.isRegisterLoading = true;
    },
    [registerUser.rejected]: (state) => {
      state.isRegisterLoading = !state.isLoading;
    },
    [loginUser.pending]: (state) => {
      state.isLoginLoading = true;
    },
    [loginUser.rejected]: (state) => {
      state.isLoginLoading = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoginLoading = false;
      state.data = action.payload;
    },
    [VerifyEMailAddress.rejected]: (state) => {
      state.isEmailLoading = false;
    },
    [VerifyEMailAddress.pending]: (state) => {
      state.isEmailLoading = true;
    },
    [VerifyEMailAddress.fulfilled]: (state) => {
      state.isEmailLoading = false;
    },
    [ResendEmailVerificationCode.rejected]: (state) => {
      state.isSendingUnlockingCode = false;
    },
    [ResendEmailVerificationCode.fulfilled]: (state) => {
      state.isSendingUnlockingCode = false;
    },
    [ResendEmailVerificationCode.pending]: (state) => {
      state.isSendingUnlockingCode = true;
    },
  },
});

export const {
  setMessage,
  setUserName,
  setError,
  setIsLoggedIn,
  setIsRegistered,
  setErrorMsgNull,
  storeUserAccessToken,
  setHasVerifiedEmail,
  setUserData,
} = userSlice.actions;
export default userSlice.reducer;
