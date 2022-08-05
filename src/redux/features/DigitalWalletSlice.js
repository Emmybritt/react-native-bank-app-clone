import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import axiosClient from "../../helpers/AxiosClient/Index";
import {
  createPinPath,
  createWalletPath,
  resendOtpRoute,
  verifyOtpRoute,
} from "../../helpers/utils/Apiroutes/ServerRoutes";

export const createUserWallet = createAsyncThunk(
  "wallet/user",
  async (action, thunkAPI) => {
    const token = JSON.parse(action.token);
    const res = await axiosInstance.post(`${createWalletPath}`, action.form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data.error_message);
    if (res.data.status === false) {
      thunkAPI.dispatch(setErrorMsg(res.data.error_message));
    } else {
      thunkAPI.dispatch(setIswallletCreated());
      setSuccesMessage(res.data.success_message);
      // console.log(res.data.success_message);
    }
  }
);

export const verifyUserOTP = createAsyncThunk(
  "verify/userWallet",
  async (action, thunkAPI) => {
    const token = JSON.parse(action.token);
    const code = action.code;
    return axiosInstance
      .post(
        `${verifyOtpRoute}${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === false) {
          thunkAPI.dispatch(setErrorMsg(res.data.error_message));
          setTimeout(() => {
            thunkAPI.dispatch(setErrorMsgNull());
          }, 8000);
        }else{
          thunkAPI.dispatch(setHasVerifiedPin())
        }
      })
      .catch((err) => {
        console.log("there was an error");
        console.log(err.response);
      });
  }
);

export const resendOtpCode = createAsyncThunk(
  "resendOtpCode/uwallet",
  async (action, thunkAPI) => {
    const token = JSON.parse(action);
    console.log(token);
    return axiosInstance
      .post(
        `${resendOtpRoute}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === false) {
          thunkAPI.dispatch(setErrorMsg(res.data.error_message));
          setTimeout(() => {
            thunkAPI.dispatch(setErrorMsgNull());
          }, 8000);
        } else {
          thunkAPI.dispatch(setSuccesMessage(res.data.success_message));
          setTimeout(() => {
            thunkAPI.dispatch(setSuccesMessageNull());
          }, 8000);
        }
      })
      .catch((err) => {
        console.log("there was an error");
        console.log(err);
      });
  }
);

export const CreateWalletPin = createAsyncThunk(
  "create/userWalletPin",
  async (action, thunkAPI) => {
    // console.log(action);
    const token = JSON.parse(action.token);
    // console.log(token);
    return axiosInstance
      .post(`${createPinPath}`, action.userPin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        
        if (res.data.status === false) {
          thunkAPI.dispatch(setErrorMsg(res.data.error_message));
        }else{
          console.log(res.data);
          thunkAPI.dispatch(setSuccesMessage(res.data.success_message));
          thunkAPI.dispatch(setHasCreatePin());
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

const initialState = {
  data: null,
  hasCreateWallet: false,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  isVerifiedNumber: null,
  hasCreateWalletPin: false,
};
const DigitalWalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setIswallletCreated: (state) => {
      state.hasCreateWallet = true;
    },
    setHasVerifiedPin: (state) => {
      state.isVerifiedNumber = true;
    },
    setErrorMsg: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccesMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setErrorMsgNull: (state) => {
      state.errorMessage = null;
    },
    setSuccesMessageNull: (state) => {
      state.successMessage = null;
    },
    setHasCreatePin: (state) => {
      state.hasCreateWalletPin = true;
    }
  },
  extraReducers: {
    [createUserWallet.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createUserWallet.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createUserWallet.rejected]: (state) => {
      state.isLoading = false;
    },
    [verifyUserOTP.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [verifyUserOTP.rejected]: (state) => {
      state.isLoading = false;
    },
    [verifyUserOTP.pending]: (state) => {
      state.isLoading = true;
    },
    [CreateWalletPin.pending]: (state) => {
      state.isLoading = true;
    },
    [CreateWalletPin.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [CreateWalletPin.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  setIswallletCreated,
  setSuccesMessageNull,
  setErrorMsgNull,
  setHasVerifiedPin,
  setErrorMsg,
  setSuccesMessage,
  setHasCreatePin
} = DigitalWalletSlice.actions;
export default DigitalWalletSlice.reducer;
