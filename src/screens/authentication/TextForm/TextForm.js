import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Animated,
  ScrollView
} from "react-native";
import { Snackbar } from "react-native-paper";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import Input from "../../../common/input/Index";
import { COLORS } from "../../../helpers/theme/constantstyles";
import CustomButton from "../../../common/button/Index";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  setErrorMsgNull,
} from "../../../redux/features/UserSlice";
import CustomToast from "../../../common/customToast/Index";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextForm = () => {
  const [errors, setErrors] = useState({});
  const [isSecured, setSecuredTextEntry] = useState({
    password: true,
    confirmpassword: true,
  });
  const [theresErrorMsg, setThereIsErrorMsg] = useState(false);
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const navigation = useNavigation();
  const [form, setForm] = useState({});
  const [snaclVisible, setSnackBar] = useState(false);

  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const isRegistered = useSelector((state) => state.user.isRegistered);

  useEffect(() => {
    console.log(isRegistered);
    if (isRegistered === true) {
      navigation.navigate("CreateNewWallet");
    } else {
      return null;
    }
  }, [isRegistered]);

 
  const handleSignupForm = () => {
    if (!form.email) {
      setErrors((prevErrors) => {
        return { ...prevErrors, email: "Your email is required*" };
      });
    } else if (!form.password) {
      setErrors((prevErrors) => {
        return { ...prevErrors, password: "Please enter your password" };
      });
    } else if (form.password.length <= 7) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Your password need to have a minumum of seven character",
        };
      });
    } else if (form.password !== form.confirmpassword) {
      setErrors((prevErrors) => {
        return { ...prevErrors, confirmpassword: "Password does not match" };
      });
    } else {
      // console.log(form);
      dispatch(registerUser(form));
    }
  };

  const setPasswordEntry = () => {
    setSecuredTextEntry((prev) => {
      return { ...prev, password: !isSecured.password };
    });
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (value !== "") {
      setErrors((prevErrors) => {
        return { ...prevErrors, [name]: null };
      });
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, [name]: "This field needs to be filled" };
      });
    }
  };

  const setConfirmPasswordEntry = () => {
    setSecuredTextEntry((prev) => {
      return { ...prev, confirmpassword: !isSecured.confirmpassword };
    });
  };

  const hideToast = () => {
    dispatch(setErrorMsgNull());
  };

  const showToast = () => {
    return (
      <CustomToast
        message={errorMsg}
        icon={
          <TouchableOpacity onPress={hideToast}>
            <Ionicons name="close" size={20} color={COLORS.headingGrey} />
          </TouchableOpacity>
        }
      />
    );
  };

  const isLoading = useSelector((state) => state.user.isRegisterLoading);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
        {/* <Image
          style={styles.logo}
          source={require("../../../../assets/Uicon1.png")}
        /> */}
        <Text style={styles.label}>create your digital bank account</Text>
        {errorMsg && showToast()}

        <Input
          onChangeText={(value) => {
            onChange({ name: "email", value });
          }}
          label="Enter Your Email"
          error={errors.email}
        />
        <Input
          onChangeText={(value) => {
            onChange({ name: "password", value });
          }}
          onPress={setPasswordEntry}
          iconRight={<Ionicons name="key" size={18} color="gray" />}
          setSecuredTextEntry={setSecuredTextEntry}
          secureTextEntry={isSecured.password}
          entry={isSecured.password}
          iconstyle={{ color: "white" }}
          icon={
            <TouchableOpacity onPress={setPasswordEntry}>
              <Text style={{ color: "grey" }}>
                {isSecured.password ? (
                  <Ionicons name="eye" size={23} color="gray" />
                ) : (
                  <Ionicons name="eye-off" size={23} color="white" />
                )}
              </Text>
            </TouchableOpacity>
          }
          label="Create Password"
          error={errors.password}
        />
        <Input
          onChangeText={(value) => onChange({ name: "confirmpassword", value })}
          icon={
            <TouchableOpacity onPress={setConfirmPasswordEntry}>
              <Text style={{ color: "grey" }}>
                {isSecured.confirmpassword ? (
                  <Ionicons name="eye" size={23} color="gray" />
                ) : (
                  <Ionicons name="eye-off" size={23} color="white" />
                )}
              </Text>
            </TouchableOpacity>
          }
          iconRight={<Ionicons name="key" size={18} color="gray" />}
          setSecuredTextEntry={setSecuredTextEntry}
          secureTextEntry={isSecured.confirmpassword}
          label="Confirm password"
          entry={isSecured.confirmpassword}
          error={errors.confirmpassword}
        />
        <Text style={[styles.decriptionText, { color: "#F5F5F5" }]}>
          By creating an account you agree to our Terms of Service and Privacy
          and policy
        </Text>
        <CustomButton
          onPress={handleSignupForm}
          isLoading={isLoading}
          title={isLoading ? "please wait..." : "Signup"}
        />
        <View style={styles.linkContainer}>
          <Text style={styles.decriptionText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TestLogin");
            }}
          >
            <Text style={styles.link}>SignIn</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TextForm;
