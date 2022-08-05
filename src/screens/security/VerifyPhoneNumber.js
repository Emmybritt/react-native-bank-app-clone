import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../../component/Button";
import axiosInstance from "../../helpers/axios/axiosInterceptor";

import { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  verifyOtpRoute,
  resendOtpRoute,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../helpers/theme/constantstyles";
import CustomButton from "../../common/button/Index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  resendOtpCode,
  setErrorMsgNull,
  verifyUserOTP,
} from "../../redux/features/DigitalWalletSlice";
import CustomToast from "../../common/customToast/Index";
import Ionicons from "@expo/vector-icons/Ionicons";

const VerifyPhoneNumber = () => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");

  const [accessToken, setAccessToken] = useState("");
  // const [loading , setLoading] = useState(false)
  const successMessage = useSelector(state => state.wallet.successMessage);

  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);
  const input_6 = useRef(null);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const loading = useSelector((state) => state.wallet.isLoading);
  const errorMessage = useSelector((state) => state.wallet.errorMessage);
  const isVerifiedNumber = useSelector((state) => state.wallet.isVerifiedNumber);

  useEffect(() => {
    if (isVerifiedNumber === true) {
      navigation.navigate("create tpin")
    }
  }, [isVerifiedNumber])


  const getToken = async () => {
    try {
      //  const token = await AsyncStorage.getItem746('token')
      //  setAccessToken(token)
    } catch (error) {
      alert(error);
    }
  };

  // useEffect(()=>{getToken(); console.log(accessToken)}, [])
  const hideToast = () => {
    dispatch(setErrorMsgNull());
  };

 

  const verifyOTP = async () => {
    // console.log('it is work');
    const code = `${value1}${value2}${value3}${value4}${value5}${value6}`;
    const token = await AsyncStorage.getItem("token");
    dispatch(verifyUserOTP({ code: code, token: token }));

    // console.log(code);
    // setLoading(false)

    // try {

    //   const UserAccessToken = await AsyncStorage.getItem('token');
    //   // console.log('userAccessToken is', typeof JSON.parse(UserAccessToken));

    // const res = await axios.post(`${verifyOtpRoute}${code}`, {}, {
    //     headers:{

    //       Authorization: `Bearer ${UserAccessToken}`

    //     }

    //   })

    //   // console.log(res.data)
    //   // console.log('it is working');

    //   if(res.data.status){

    //     navigation.navigate('create tpin')
    //     setLoading(false)

    //   }
    //   // console.log(typeof accessToken);
    //   if(!res.data.status){
    //     setLoading(false)
    //     alert("There was an error , kindly try again")
    //   }

    // }

    // catch(error){
    //   setLoading(false)
    //   alert('There was an error , kindly try again')

    // }
  };

  const handleResendOTP = async () => {
    let token = await AsyncStorage.getItem("token");

    dispatch(resendOtpCode(token));
    // try{
    //   const UserAccessToken = await AsyncStorage.getItem('token');

    //   const res = await axiosInstance.post(`${resendOtpRoute}`,{
    //     headers:{

    //       Authorization: `Bearer ${UserAccessToken}`

    //     }

    //   })

    //   // console.log(res.data)

    //   if(res.data.status){
    //     alert('enter new OTP')
    //   }

    // }
    // catch(error){

    //   console.log(error)

    // }
  };

  const showToast = (message) => {
    return (
      <CustomToast
        message={message}
        icon={
          <TouchableOpacity onPress={hideToast}>
            <Ionicons name="close" size={20} color={COLORS.headingGrey} />
          </TouchableOpacity>
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <View style={styles.containerSecondary}>
          <Text style={styles.heading}>Verify Phone Number</Text>
          <Image
            style={styles.image}
            source={require("../../../assets/images/password.png")}
          />
          <Text>
            {errorMessage && showToast(errorMessage)}
            {successMessage && showToast(successMessage)}
          </Text>
          

          <Text style={styles.subheading}>
            Input the OTP sent to your registered phone number to confirm its
            validity
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => {
          navigation.navigate("create tpin")
        }}>
          <Text>create tpin</Text>
        </TouchableOpacity> */}

        <View style={styles.inputContainer}>
          <TextInput
            value={value1}
            onChangeText={(value) => {
              setValue1(value);
              if (value) {
                input_2.current.focus();
              }
            }}
            onEndEditing={() => setActive1(false)}
            onFocus={() => setActive1(true)}
            ref={input_1}
            style={[
              styles.input,
              { borderColor: active1 ? COLORS.focus : COLORS.inputBorder },
            ]}
            secureTextEntry
            maxLength={1}
            caretHidden={true}
          />

          <TextInput
            value={value2}
            onChangeText={(value) => {
              setValue2(value);
              if (value) {
                input_3.current.focus();
              }
            }}
            onEndEditing={() => {
              setActive2(false);
            }}
            onFocus={() => setActive2(true)}
            ref={input_2}
            style={[
              styles.input,
              { borderColor: active2 ? COLORS.focus : COLORS.inputBorder },
            ]}
            secureTextEntry
            maxLength={1}
            caretHidden={true}
          />

          <TextInput
            value={value3}
            onChangeText={(value) => {
              setValue3(value);
              if (value) {
                input_4.current.focus();
              }
            }}
            onEndEditing={() => {
              setActive3(false);
            }}
            onFocus={() => setActive3(true)}
            ref={input_3}
            style={[
              styles.input,
              { borderColor: active3 ? COLORS.focus : COLORS.inputBorder },
            ]}
            secureTextEntry
            maxLength={1}
            caretHidden={true}
          />

          <TextInput
            value={value4}
            onChangeText={(value) => {
              setValue4(value);
              if (value) {
                input_5.current.focus();
              }
            }}
            onEndEditing={() => setActive4(false)}
            onFocus={() => setActive4(true)}
            ref={input_4}
            style={[
              styles.input,
              { borderColor: active4 ? COLORS.focus : COLORS.inputBorder },
            ]}
            secureTextEntry
            maxLength={1}
            caretHidden={true}
          />

          <TextInput
            value={value5}
            onChangeText={(value) => {
              setValue5(value);
              if (value) {
                input_6.current.focus();
              }
            }}
            onEndEditing={() => setActive5(false)}
            onFocus={() => setActive5(true)}
            ref={input_5}
            style={[
              styles.input,
              { borderColor: active5 ? COLORS.focus : COLORS.inputBorder },
            ]}
            secureTextEntry
            maxLength={1}
            caretHidden={true}
          />

          <TextInput
            value={value6}
            onChangeText={(value) => setValue6(value)}
            onEndEditing={() => setActive6(false)}
            onFocus={() => setActive6(true)}
            ref={input_6}
            style={[
              styles.input,
              { borderColor: active6 ? COLORS.focus : COLORS.inputBorder },
            ]}
            secureTextEntry
            maxLength={1}
            caretHidden={true}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            isLoading={loading}
            title={loading ? "validating..." : "next"}
            onPress={verifyOTP}
          />
          {/* <Button text='Next' color={COLORS.focus} onPress={verifyOTP}/> */}
        </View>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 16 }}
        />

      

        <View style={styles.footerText}>
          <Text style={{ color: "white", fontSize: 12 }}>click </Text>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "800",
                marginHorizontal: 3,
              }}
            >
              here
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 12 }}>to resend otp</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGreen,
    height: "100%",
  },
  containerPrimary: {
    marginTop: "50%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: "5%",
    marginBottom: "15%",
  },
  input: {
    width: "8%",
    height: 30,
    borderWidth: 2,
    marginHorizontal: "3%",
    paddingLeft: "2%",
    color: "white",
  },
  containerSecondary: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: COLORS.headingGrey,
    fontWeight: "500",
    fontSize: 20,
  },
  image: {
    marginVertical: 20,
  },
  subheading: {
    textAlign: "center",
    paddingHorizontal: "15%",
    color: COLORS.headingGrey,
    marginBottom: "5%",
  },
  buttonContainer: {
    paddingHorizontal: "10%",
  },
  footerText: {
    //  color: COLORS.headingGrey,
    //  textAlign:'center',
    //  fontSize:10,
    //  marginTop:12
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VerifyPhoneNumber;
