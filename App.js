import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { COLORS } from "./src/helpers/theme/constantstyles";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import CreateTransferPin from "./src/screens/home/createTransferPin";
import { useEffect, useState } from "react";
import { OnboardingNavigation } from "./src/helpers/OnboardingNavigation/OnboardingNavigation";
import { useFonts, Poppins_medium } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import {
  AddMoney,
  Button,
  Card,
  Deposit,
  DepositSuccessful,
  OtpPage,
  PaymentAndBills,
  SignIn,
  SignUp,
  TransferConfirm,
  TransferFunds,
  TransferSuccessful,
  WalletDetails,
  WithdrawFunds,
  Welcomeback,
  CreateNewPassword,
  MailPassword,
  ForgetPassword,
  TransferType,
  ChangePIN,
  ChangePassword,
  ResetPassword,
  ResetPin,
  PrivacyAndSecurity,
  AccountInfo,
  BuyAirtime,
  BuyData,
  ElectricityPayment,
  ConfirmAirtime,
  ConfirmData,
  ConfirmElectricity,
  VerifyPhoneNumber,
  TransferToUlego,
  CableTv,
  ConfirmCablePurchase,
  AuthorizeUlegoTransfer,
  VerifyMail,
  AllTransactions,
  UpgradeAccount,
} from "./src/helpers/utils/screen/ScreenImports";

import Onboarding from "./src/navigation/onboarding/Onboarding";

import HomePageNavigator from "./src/navigation/home/HomePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextForm from "./src/screens/authentication/TextForm/TextForm";
import TextLogin from "./src/screens/authentication/TextLogin/Index";
import TextForgotPassword from "./src/screens/authentication/TextForgotPassword/Index";
import Onboard from "./src/screens/onboarding/Onbording/Index";
import { Provider } from "react-redux";
import { store } from "./src/redux/store/store";
import NewWalletCreation from "./src/screens/registration/NewWalletCreation/Index";
import TransactionDetails from "./src/screens/TransactionDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [routeCondition, setRouteCondition] = useState("");
  const [accountName, setAccountName] = useState("");
  

  useEffect(async () => {
    await SplashScreen.preventAutoHideAsync();
    // const userFirstName = await AsyncStorage.getItem("firstName");
    const userFirstName = await AsyncStorage.getItem("token");
    setAccountName(userFirstName);
    // console.log('First name from app.js',userFirstName);
    setAccountName(userFirstName)

    const routeResponse = await OnboardingNavigation();
    console.log("This is the route response", routeResponse);

    setRouteCondition(routeResponse);

    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 500);
  }, []);

  const renderScreenConditionally = () => {
    if (routeCondition.is_transaction_pin_setup) {
      return (
        <Provider store={store}>
          <>
            <Stack.Screen
              name="welcome"
              component={Welcomeback}
              options={{ headerShown: false }}
            />
          </>
        </Provider>
      );
    }

    if (routeCondition.is_phone_number_verified) {
      return (
        <Provider store={store}>
          <>
            <Stack.Screen
              name="create tpin"
              component={CreateTransferPin}
              options={{
                title: "Create Transfer Pin",
                headerShown: false,
              }}
            />
          </>
        </Provider>
      );
    }

    if (routeCondition.is_wallet_setup) {
      return (
        <Provider store={store}>
          <>
            <Stack.Screen
              name="verify number"
              component={VerifyPhoneNumber}
              options={{ headerShown: false }}
            />
          </>
        </Provider>
      );
    }
  };

  

  return (
    <Provider store={store}>
      <>
        {/* <StatusBar/> */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                textAlign: "center",
                fontWeight: "500",
                fontSize: 16,
              },
              title: "Transfer Funds",
              headerTitleAlign: "center",
            }}
          >
            {accountName ? (
              <>
                <Stack.Screen
                  name="welcome"
                  component={Welcomeback}
                  options={{ headerShown: false }}
                />
              </>
            ) : routeCondition ? (
              renderScreenConditionally()
            ) : (
              <>
                {/* <Stack.Screen name='onboarding' component={Onboarding} options={{ headerShown: false }}/>    */}
                <Stack.Screen
                  name="onboarding"
                  component={Onboard}
                  options={{ headerShown: false }}
                />
              </>
            )}

            {/* <Stack.Screen
            name="Wallet Details"
            component={WalletDetails}
            options={{ headerShown: false }}
          /> */}
            <Stack.Screen
              name="CreateWallet"
              component={WalletDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateNewWallet"
              component={NewWalletCreation}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          /> */}
            {/* <Stack.Screen name='Onboard' component={Onboard} options={{ headerShown: false }} />  */}

            <Stack.Screen
              name="TestForm"
              component={TextForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TestLogin"
              component={TextLogin}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="TestForgotPassword"
              component={TextForgotPassword}
              options={{ headerShown: false }}
            />

            {/* <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          /> */}
            <Stack.Screen
              name="home"
              component={HomePageNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="create new password"
              component={CreateNewPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="verify email"
              component={VerifyMail}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="mail password"
              component={MailPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="forget password"
              component={ForgetPassword}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="verify number"
              component={VerifyPhoneNumber}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="create tpin"
              component={CreateTransferPin}
              options={{
                title: "Create Transfer Pin",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="confirm airtime"
              component={ConfirmAirtime}
              options={{
                title: "Airtime",
              }}
            />

            <Stack.Screen
              name="welcome back"
              component={Welcomeback}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="transfer"
              component={TransferFunds}
              options={{
                title: "Transfer Funds",
              }}
            />
            <Stack.Screen
              name="transfer to ulego"
              component={TransferToUlego}
              options={{
                title: "Transfer Funds",
              }}
            />
            <Stack.Screen
              name="change pin"
              component={ChangePIN}
              options={{
                title: "Transaction PIN",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />

            <Stack.Screen
              name="upgrade account"
              component={UpgradeAccount}
              options={{
                title: "Upgrade Account",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />
            <Stack.Screen
              name="account info"
              component={AccountInfo}
              options={{
                title: "Account Info",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />
            <Stack.Screen
              name="change password"
              component={ChangePassword}
              options={{
                title: "Change Password",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />
            <Stack.Screen
              name="reset password"
              component={ResetPassword}
              options={{
                title: "Reset Password",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />

            <Stack.Screen
              name="security"
              component={PrivacyAndSecurity}
              options={{
                title: "Privacy & Security",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />

            <Stack.Screen
              name="reset pin"
              component={ResetPin}
              options={{
                title: "Reset PIN",
                headerStyle: {
                  backgroundColor: COLORS.bluebg,
                },
                headerTintColor: COLORS.primary,
              }}
            />
            <Stack.Screen
              name="transfer type"
              component={TransferType}
              options={{
                title: "Transfer",
              }}
            />
            <Stack.Screen
              name="all transactions"
              component={AllTransactions}
              options={{
                title: "Transactions",
              }}
            />
            <Stack.Screen
              name="deposit"
              component={Deposit}
              options={{
                title: "Deposit",
              }}
            />
            <Stack.Screen
              name="withdraw"
              component={WithdrawFunds}
              options={{
                title: "Withdraw",
              }}
            />
            <Stack.Screen
              name="payment"
              component={PaymentAndBills}
              options={{
                title: "Payment & Bills",
              }}
            />

            <Stack.Screen name="Transaction Details" component={TransactionDetails}
            options={{
              title: "Transaction Details"
            }}
            
            />

            <Stack.Screen
              name="confirm"
              component={TransferConfirm}
              options={{ title: "Confirmation" }}
            />
            <Stack.Screen
              name="ulego confirm"
              component={AuthorizeUlegoTransfer}
              options={{ title: "Confirmation" }}
            />
            <Stack.Screen name="button" component={Button} />
            <Stack.Screen
              name="add money"
              component={AddMoney}
              options={{
                title: "Add Money",
              }}
            />

            <Stack.Screen
              name="successful"
              component={DepositSuccessful}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otp"
              component={OtpPage}
              options={{
                title: "OTP",
              }}
            />
            <Stack.Screen
              name="card details"
              component={Card}
              options={{
                title: "Add Money from Card",
              }}
            />
            <Stack.Screen
              name="Transfer Successful"
              component={TransferSuccessful}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Buy Airtime"
              component={BuyAirtime}
              options={{
                title: "Buy Airtime",
              }}
            />

            <Stack.Screen
              name="Buy Data"
              component={BuyData}
              options={{
                title: "Buy Data",
              }}
            />

            <Stack.Screen
              name="cable tv"
              component={CableTv}
              options={{
                title: "Cable Tv",
              }}
            />

            <Stack.Screen
              name="Electricity Payment"
              component={ElectricityPayment}
              options={{
                title: "Electricity Payment",
              }}
            />

            <Stack.Screen
              name="confirm data"
              component={ConfirmData}
              options={{
                title: "Data",
              }}
            />

            <Stack.Screen
              name="confirm electricity"
              component={ConfirmElectricity}
              options={{
                title: "Electricity",
              }}
            />
            <Stack.Screen
              name="confirm cable"
              component={ConfirmCablePurchase}
              options={{
                title: "Cable TV",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </Provider>
  );
}
