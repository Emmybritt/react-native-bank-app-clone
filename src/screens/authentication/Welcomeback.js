import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Snackbar } from "react-native-paper";

import { COLORS } from "../../helpers/theme/constantstyles";
import { useState, useEffect } from "react";
import { signInPath } from "../../helpers/utils/Apiroutes/ServerRoutes";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../common/input/Index";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../common/button/Index";
import CustomToast from "../../common/customToast/Index";
import { useDispatch } from "react-redux";

const Welcomeback = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userWalletDetail, setWalletDetails] = useState(null)
  const [isPassword, setIspassword] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("response");
      // console.log('setDataaaaaaa',data);

      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const userWalletDetails = await AsyncStorage.getItem("userResponseDatas");
      setWalletDetails(JSON.parse(userWalletDetails));
      setFirstName(firstName);
      setLastName(lastName);

      const email = JSON.parse(data);
      if (!email.username) {
        setUsername(email);
      } else {
        setUsername(email.username);
      }

      // console.log('This is the email', email)
    })();
  }, []);

  const navigation = useNavigation();

  const authenticateWithBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();

    if (compatible) {
      const authenticateUser = await LocalAuthentication.authenticateAsync();

      if (!authenticateUser.success) {
        setVisible(true);
      } else {
        navigation.navigate("home");
      }
    }
  };

  const validateLoginCredentialsAndLogin = async () => {
    const loginCredentials = { username, password };
    setErrorMessage(null);
    if (password) {
      // console.log("it is working");
      try {
        setIsLoading(true);
        const res = await axiosInstance.post(`${signInPath}`, loginCredentials);
        // console.log(res.data);
        if (!res.data) {
          alert("Seems you are offline , check your network and try again");
          setErrorMessage(null);
          setIsLoading(false);
        }else if (res.data.status === true) {
          navigation.navigate("home");
          setIsLoading(false);
          setPassword("");
        } else if (!res.data) {
          alert("Seems you are offline , check your internet connection and try again");
        } else if (
          res.data.error_message === "Password does not match the account"
        ) {
          setIsLoading(false);
          setPasswordError(res.data.error_message);
          console.log(res.data.error_message);
        } else {
          // console.log(res.data.result[0].refresh_token);
          const token = JSON.stringify(res.data.result[0].token);
          const refreshToken = JSON.stringify(res.data.result[0].refresh_token);

          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("refreshToken", refreshToken);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setPasswordError(true);
      }
    } else {
      setErrorMessage("Ensure you enter your password");
    }
  };

  const forgetPassword = () => {
    navigation.navigate("forget password");
  };

  const signOut = () => {
    navigation.navigate("TestLogin");
  };

  const getProfilePicture = async () => {
    try {
      const image = await AsyncStorage.getItem("profile");
      // console.log('This is the image',image);

      setImage(JSON.parse(image));
    } catch (error) {
      alert(error);
    }
  };

  const ToggleShowPassword = () => {
    setIspassword((prev) => !prev);
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.containerPrimary}>
          {/* <Image source={require(image)} /> */}
          {
            <Image
              style={styles.image}
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/images/ava.png")
              }
            />
          }
          <Text style={styles.heading}>Welcome Back</Text>
          {userWalletDetail && (
            <Text style={styles.name}>
            {userWalletDetail.first_name} {userWalletDetail.last_name}
          </Text>
          )}
          
        </View>

        <View style={styles.containerSecondary}>
          <View style={{ marginBottom: 10 }}>
            {passwordError ? (
              <CustomToast
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setPasswordError(null);
                    }}
                  >
                    <Ionicons name="close" color="white" size={20} />
                  </TouchableOpacity>
                }
                message={<Text>The password you entered is incorrect</Text>}
              />
            ) : null}
          </View>

          <Text style={[styles.password, { fontSize: 16 }]}>
            Enter password
          </Text>
          <Input
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={isPassword}
            iconRight={<Ionicons name="key" size={20} color="gray" />}
            autoCapitalize="none"
            error={<Text>{errorMessage}</Text>}
            icon={
              <TouchableOpacity onPress={ToggleShowPassword}>
                <Ionicons
                  name={isPassword ? "eye-off" : "eye"}
                  color="gray"
                  size={24}
                />
              </TouchableOpacity>
            }
          />

          <View>
            <CustomButton
              onPress={validateLoginCredentialsAndLogin}
              style={{
                backgroundColor: COLORS.textGreen,
                borderRadius: 10,
                paddingVertical: 14,
                alignSelf: "center",
                marginTop: -16,
                width: "60%",
              }}
              title={isLoading ? "Please wait..." : "Sign in"}
            />
          </View>

          {
            <ActivityIndicator
              size="large"
              color={"white"}
              animating={isLoading}
            />
          }

          <TouchableOpacity
            onPress={() => {
              forgetPassword();
            }}
          >
            <Text style={styles.forget}>Forget password?</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.pressable}
            onPress={authenticateWithBiometrics}
          >
            <Image
              style={styles.print}
              source={require("../../../assets/images/fingerprint.png")}
            />
          </TouchableOpacity> */}
        </View>

        <View style={styles.containerTertiary}>
          <TouchableOpacity onPress={signOut}>
            <Text style={{ color: COLORS.white, fontSize: 12 }}>
              Sign in a new device
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Snackbar
            visible={visible}
            style={{
              backgroundColor: "grey",
              width: "60%",
              alignSelf: "center",
            }}
            //   duration={200}
            onDismiss={() => {
              setVisible(false);
            }}
            action={{
              label: "Ok",
              onPress: () => {
                setVisible(false);
              },
            }}
          >
            No fingerprint detected!
          </Snackbar>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    backgroundColor: COLORS.primary,
  },
  containerPrimary: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
  heading: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 28,
    marginTop: 12,
    letterSpacing: 1.2,
  },
  name: {
    color: COLORS.white,
  },

  containerSecondary: {
    marginTop: "15%",
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
  password: {
    color: COLORS.white,
    marginLeft: "5%",
  },
  forget: {
    color: COLORS.white,
    alignSelf: "center",
    fontSize: 16,
  },
  input: {
    backgroundColor: COLORS.inputGreen,
    color: COLORS.white,
    borderRadius: 40,
    height: 40,
    marginVertical: "3%",
    paddingLeft: 32,
  },
  containerTertiary: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%",
  },
  print: {
    alignSelf: "center",
    marginTop: 12,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  pressable: {
    width: "20%",
    alignSelf: "center",
  },
  bottomsheet: {
    flex: 1,
  },
  signin: {
    textAlign: "center",
    fontWeight: "700",
    marginVertical: "10%",
    color: COLORS.white,
    fontSize: 18,
  },
  text: {
    textAlign: "center",
    color: COLORS.white,
    marginTop: "5%",
    marginBottom: "40%",
  },
  signout: {
    textAlign: "center",

    color: COLORS.white,
  },
  login: {
    position: "absolute",
    left: "95%",
    top: "27%",
    zIndex: 1,
  },
  loginImg: {},
  pressable: {
    width: "20%",
    alignSelf: "center",
    position: "absolute",
    top: "120%",
  },
});

export default Welcomeback;
