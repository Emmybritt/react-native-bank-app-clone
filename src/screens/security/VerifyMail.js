import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import Button from "../../component/Button";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { COLORS } from "../../helpers/theme/constantstyles";
import {
  resendSignInCode,
  verifySignInCode,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { OnboardingNavigation } from "../../helpers/OnboardingNavigation/OnboardingNavigation";
import CustomButton from "../../common/button/Index";
import Input from "../../common/input/Index";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch, useSelector} from 'react-redux'
import { ResendEmailVerificationCode, setErrorMsgNull, VerifyEMailAddress } from "../../redux/features/UserSlice";
import CustomToast from "../../common/customToast/Index";

const VerifyMail = ({route}) => {
  useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    console.log('User tokkkkkk',token);
  }, []);

  const {email} = route.params;

  const [code, setCode] = useState("");
  const [isPassword, setPassword] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLoading,hasVerifiedEmail, isEmailLoading, errorMsg, isSendingUnlockingCode} = useSelector(state => state.user);
  

  
  const navigateUser = async () => {
    const routeData = await OnboardingNavigation();

    console.log(routeData);

    if (routeData.is_transaction_pin_setup) {
      navigation.navigate("home");
    } else if (routeData.is_phone_number_verified) {
      navigation.navigate("create tpin");
    } else if (routeData.is_wallet_setup) {
      navigation.navigate("verify number");
    } else if (!routeData.is_wallet_setup) {
      navigation.navigate("Wallet Details");
    }
  };

  const RemoveToast = () => {
    dispatch(setErrorMsgNull())
  }

  useEffect(() => {
    console.log(hasVerifiedEmail);
    if (hasVerifiedEmail === true) {
      navigateUser();
    }
  }, [hasVerifiedEmail]);

  const verifyEmail = async () => {
    const signingMail = await AsyncStorage.getItem("signinMail");
    const userName = JSON.parse(signingMail);

   
    const data = {
      userName: email,
      code: code
    }
    // console.log(data);
    dispatch(VerifyEMailAddress(data)).then(() => {
      setCode("");
    })
  
    

    // try {
    //   const res = await axiosInstance.post(
    //     `${verifySignInCode}?code=${code}&user_email=${userName}`,
    //     {}
    //   );

    //   const data = res.data.result[0];
    //   await AsyncStorage.setItem("response", JSON.stringify(data));

    //   if (res.data.status) {
    //     navigateUser();

    //     await AsyncStorage.setItem("token", data.token);
    //     await AsyncStorage.setItem("refreshToken", data.refresh_token);

    //     // navigateUser()
    //   }
    // } catch (error) {
    //   console.log(error);
    //   console.log(error);

    //   alert("can't sign you in check your code and try again");
    // }
  };

  const resendSecurityCode = async () => {
    const userName = await AsyncStorage.getItem("signinMail");
    dispatch(ResendEmailVerificationCode(userName));
    console.log('This is the username',userName);

    // try {
    //   // const res = await axiosInstance.post(
    //   //   `${resendSignInCode}?user_email=${userName}`,
    //   //   {}
    //   // );

    //   const res = await axiosInstance.post(
    //       `${resendSignInCode}?user_email=${userName}`,
    //       {}
    //     );

      

    //   console.log(res.data);

    //   if (res.data.status) {
    //     alert("Check your mail for security code");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert("can't send you security code at this time , try again");
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <Image
          source={require("../../../assets/images/email.png")}
          style={styles.image}
        />

        <Text style={styles.heading}>Check your email for security code</Text>
        {errorMsg && <CustomToast style={{backgroundColor: COLORS.inputGreen}} message={errorMsg} icon={<Ionicons onPress={RemoveToast} name="close" size={20} color="white" />} />}
        <View style={styles.inputContainer}>
          
          <TextInput
            keyboardType="number-pad"
            value={code}
            onChangeText={(value) => setCode(value)}
            style={styles.input}
            secureTextEntry={isPassword}
          />
          <TouchableOpacity onPress={() => {
            return setPassword(prev => !prev);
          }}>
            <Ionicons name={isPassword ? "eye-off" : "eye"} size={19} color="white" />
          </TouchableOpacity>
          
        </View>

        <Text style={styles.text}>
          Input the security code to confirm your account
        </Text>

        {/* <View style={styles.buttonContainer}><Button text='Proceed' onPress={verifyEmail}/></View> */}

        <View style={{ marginVertical: 30 }} />
        <CustomButton title={isEmailLoading ?  'Please wait...' : "proceed"} onPress={verifyEmail} />
        <View style={{ flexDirection: "row", marginTop: 18 }}>
          <Text style={styles.text}>click</Text>
          <TouchableOpacity onPress={resendSecurityCode}>
            <Text
              style={[
                { color: "white", marginHorizontal: 8, fontWeight: "600" },
              ]}
            >
              here
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>to resend security code</Text>
        </View>

        {/* <Text style={[styles.text,{marginTop:4}]}>click <Text style={{fontSize:16, fontWeight:'500'}} onPress={()=> resendSecurityCode()}>
          <TouchableOpacity><Text>here</Text></TouchableOpacity>
          </Text> to resend security code</Text> */}
      </View>
      {isSendingUnlockingCode && <ActivityIndicator style={{marginTop: 20}}  />}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGreen,
    height: "100%",
    paddingHorizontal: "10%",
  },
  containerPrimary: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "60%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.inputGreen,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 40,
    borderRadius: 100,
    marginVertical: 24,
  },
  input: {
    height: 40,
    width: "100%",
    // paddingVertical: 24,
    paddingTop: 15,
    paddingBottom: 15,
    height: Platform.os === "ios" ? 62 : 50,
    borderRadius: 20,
    color: "white",
    paddingLeft: 16,
  },
  buttonContainer: {
    width: "100%",
    marginTop: "40%",
  },
  image: {
    marginBottom: "10%",
  },
  heading: {
    color: COLORS.headingGrey,
    fontSize: 20,
    fontWeight: "500",
    marginVertical: "8%",
  },
  text: {
    color: COLORS.headingGrey,
    fontWeight: "200",
  },
});

export default VerifyMail;
