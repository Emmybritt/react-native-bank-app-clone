import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
  Animated,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
} from "../../../redux/features/UserSlice";

import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../../common/input/Index";
import CustomButton from "../../../common/button/Index";
import { COLORS } from "../../../helpers/theme/constantstyles";
import { createUserWallet, setErrorMsgNull } from "../../../redux/features/DigitalWalletSlice";
import CustomToast from "../../../common/customToast/Index";

const NewWalletCreation = () => {
  const [errors, setErrors] = useState({});
  const [isSecured, setSecuredTextEntry] = useState({
    password: true,
    confirmpassword: true,
  });
  // const [theresErrorMsg, setThereIsErrorMsg] = useState(false);
  // const navigation = useNavigation();
  const [form, setForm] = useState({});
  const [dateVisible, setDateVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();

  const dispatch = useDispatch();

  const { errorMessage } = useSelector((state) => state.wallet);

  const  hasCreateWallet  = useSelector((state) => state.wallet.hasCreateWallet);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(hasCreateWallet);
    if (hasCreateWallet === true) {
      navigation.navigate("verify number");
    }
  }, [hasCreateWallet]);

  const handleCreateWallet = async () => {
    if (!form.phoneNumber) {
      setErrors((prevErrors) => {
        return { ...prevErrors, phoneNumber: "Your email is required*" };
      });
    }
    if (!form.firstName) {
      setErrors((prevErrors) => {
        return { ...prevErrors, firstName: "Please enter your firstname" };
      });
    }
    if (!form.lastName) {
      setErrors((prevErrors) => {
        return { ...prevErrors, lastName: "Please enter your lastname" };
      });
    }
    if (!form.middleName) {
      setErrors((prevErrors) => {
        return { ...prevErrors, middleName: "Please enter your middle name" };
      });
    }
    if (!form.dateOfBirth) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          dateOfBirth: "Please enter your date of birth",
        };
      });
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, dateOfBirth: "" };
      });
      let token = await AsyncStorage.getItem("token");
      dispatch(setErrorMsgNull());
      dispatch(createUserWallet({ form: form, token: token }));
      // console.log(getUserToken());
    }
  };

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (form.dateOfBirth) {
      setErrors((prevErrors) => {
        return { ...prevErrors, dateOfBirth: "" };
      });
    }
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

  const hideToast = () => {
    dispatch(setErrorMsgNull())
  };
  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const showToast = () => {
    return (
      <CustomToast
        message={errorMessage}
        icon={
          <TouchableOpacity onPress={hideToast}>
            <Ionicons name="close" size={20} color={COLORS.headingGrey} />
          </TouchableOpacity>
        }
      />
    );
  };

  const isLoading = useSelector((state) => state.wallet.isLoading);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image
          style={styles.logo}
          source={require("../../../../assets/Uicon1.png")}
        /> */}
        <Text style={styles.label}>create your digital wallet</Text>
        {errorMessage && showToast()}

        <Input
          keyboardType="number-pad"
          onChangeText={(value) => {
            onChange({ name: "phoneNumber", value });
          }}
          label="Enter Your Phone number"
          error={errors.phoneNumber}
        />
        <Input
          onChangeText={(value) => {
            onChange({ name: "firstName", value });
          }}
          entry={isSecured.password}
          iconstyle={{ color: "white" }}
          label="Enter firstname"
          error={errors.firstName}
        />
        <Input
          onChangeText={(value) => {
            onChange({ name: "lastName", value });
          }}
          entry={isSecured.password}
          iconstyle={{ color: "white" }}
          label="Enter lastname"
          error={errors.lastName}
        />
        <Input
          onChangeText={(value) => {
            onChange({ name: "middleName", value });
          }}
          entry={isSecured.password}
          iconstyle={{ color: "white" }}
          label="Enter middlename"
          error={errors.middleName}
        />

        <TouchableOpacity
          onPress={() => {
            setDateVisible(true);
          }}
        >
          <Text style={styles.text}>Enter date of birth</Text>
          <TextInput
            onPressIn={() => {
              setDateVisible(true);
            }}
            style={styles.input}
            editable={false}
            value={dateOfBirth}
          />
          <Text style={styles.error}>
            {errors.dateOfBirth && errors.dateOfBirth}
          </Text>
          {/* <Input onChangeText={(value) => {
            onChange({name: "dateOfBirth", value: dateOfBirth})
          }} label="Enter date of birth" editable={false} /> */}
          <DateTimePickerModal
            onConfirm={(date) => {
              setDateOfBirth(date.toLocaleDateString());
              setForm({ ...form, dateOfBirth: date.toLocaleDateString() });
              // console.log(date.toLocaleDateString());
              setDateVisible(false);
            }}
            mode="date"
            isVisible={dateVisible}
            onCancel={() => hideDatePicker()}
          />
        </TouchableOpacity>
        

        <Text style={[styles.decriptionText, { color: "#F5F5F5" }]}>
          By creating a wallet you agree to our Terms of Service and Privacy
          and policy
        </Text>
        <CustomButton
          onPress={handleCreateWallet}
          isLoading={isLoading}
          title={isLoading ? "please wait..." : "Create wallet"}
        />
      </ScrollView>
    </View>
  );
};

export default NewWalletCreation;
