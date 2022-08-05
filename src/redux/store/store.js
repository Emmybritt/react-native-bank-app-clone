import { configureStore } from '@reduxjs/toolkit';
import AirtimeSlice from '../features/AirtimeSlice';
import DigitalWalletSlice from '../features/DigitalWalletSlice';
import OnboardingSlice from '../features/OnboardingSlice';
import TransactionDetailsSlice from '../features/TransactionDetailsSlice';
import TransferBeneficiarySlice from '../features/TransferBeneficiarySlice';
import UserProfileSlice from '../features/UserProfileSlice';
import userSlice from '../features/UserSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    wallet: DigitalWalletSlice,
    userProfile: UserProfileSlice,
    onBoarding: OnboardingSlice,
    airtime: AirtimeSlice,
    transactionDetails: TransactionDetailsSlice,
    transferBeneficiaries: TransferBeneficiarySlice
  }
});