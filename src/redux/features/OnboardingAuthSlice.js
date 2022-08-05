import {createSlice} from '@reduxjs/toolkit'


const initalState = {
  is_transaction_pin_setup: false,
  is_phone_number_verified: false,
  is_wallet_setup: false,
}

const OnboardingAuthSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {

  },
  extraReducers: {

  }
});


export const {} = OnboardingAuthSlice.actions;
export default OnboardingAuthSlice.reducer;