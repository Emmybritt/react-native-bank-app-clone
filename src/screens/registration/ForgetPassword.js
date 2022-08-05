import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Button from "../../component/Button";
import { COLORS } from "../../helpers/theme/constantstyles";

import axiosInstance from "../../helpers/axios/axiosInterceptor";

import { useNavigation } from "@react-navigation/native";

import { forgetPasswordRoute } from "../../helpers/utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomToast from "../../common/customToast/Index";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../common/button/Index";

const ForgetPassword = () => {
  const [userMail, setUserMail] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMessage] = useState();

  const getUserMail = (value) => {
    setUserMail(value);
  };

  const navigation = useNavigation();

  const resetPassword = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        `${forgetPasswordRoute}/${userMail}`
      );

      console.log(res.data);
      // setErrorMessage(res.data.error_message);

      await AsyncStorage.setItem("forgottenPassswordMail", `${userMail}`);

      if (!res.data) {
        setLoading(false);
        alert(`check your mail and try again.`);
      }

      if (res.data.status === false) {
      }

      if (res.data.status) {
        navigation.navigate("mail password");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerPrimary}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/warn.png")}
          />

          <Text style={styles.heading}>Forget Password</Text>
          {errorMsg && (
            <CustomToast
              message="Field required"
              icon={<Ionicons name="close" color="white" size={20} />}
            />
          )}

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={userMail}
            onChangeText={(value) => {
              getUserMail(value);
            }}
          />

          <Text style={styles.footerText}>
            Enter your registered mail to reset your password
          </Text>

          {/* <Button text={loading ? 'Validating...' : 'Reset Password' } onPress={resetPassword}/> */}
          <CustomButton
            title={loading ? "Validating..." : "Reset Password"}
            onPress={resetPassword}
          />

          <ActivityIndicator animating={loading} style={{ marginTop: 16 }} />

          <TouchableOpacity onPress={() => navigation.navigate("TestLogin")}>
            <Text style={styles.text}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.darkGreen,
    // backgroundColor: 'rgb(43, 105, 106)',
    paddingHorizontal: "13%",
  },
  containerPrimary: {
    paddingTop: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {},
  input: {
    backgroundColor: COLORS.inputGreen,
    borderRadius: 40,
    height: 40,
    color: COLORS.white,
    paddingLeft: 32,
    width: "100%",
    // paddingVertical: 20,
    height: 46,
  },
  heading: {
    color: COLORS.headingGrey,
    fontSize: 24,
    marginVertical: "15%",
  },
  footerText: {
    color: COLORS.headingGrey,
    fontWeight: "200",
    marginTop: "2%",
    marginBottom: "20%",
  },
  text: {
    marginTop: "70%",
    paddingBottom:40,
    color: COLORS.headingGrey,
  },
});

export default ForgetPassword;
