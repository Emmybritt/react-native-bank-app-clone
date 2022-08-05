import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import styles from "../../styles/others/createpin";
import Button from "../../component/Button";
import { COLORS } from "../../helpers/theme/constantstyles";
import { useState, useRef } from "react";
import { createPinPath } from "../../helpers/utils/Apiroutes/ServerRoutes";

import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../common/button/Index";
import { useDispatch, useSelector } from "react-redux";
import { CreateWalletPin } from "../../redux/features/DigitalWalletSlice";

const CreateTransferPin = () => {
  // const [loading , setLoading] = useState(false)
  const loading = useSelector((state) => state.wallet.isLoading);

  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);

  const hasCreateWalletPin = useSelector(
    (state) => state.wallet.hasCreateWalletPin
  );
  // console.log(hasCreateWalletPin);
  useEffect(() => {
    if (hasCreateWalletPin === true) {
      navigation.navigate("home")
    }
  }, [hasCreateWalletPin])

  const getValue1 = (value) => {
    setValue1(value);
  };
  const getValue2 = (value) => {
    setValue2(value);
  };
  const getValue3 = (value) => {
    setValue3(value);
  };
  const getValue4 = (value) => {
    setValue4(value);
  };

  const userPin = { pin: `${value1}${value2}${value3}${value4}` };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pushUserInfoPinServer = async () => {
    // setLoading(true)
    // console.log(userPin);

    const token = await AsyncStorage.getItem("token");
    dispatch(CreateWalletPin({ userPin: userPin, token: token }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSecondary}>
        <Text style={styles.header}>Almost done</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/password.png")}
          />
        </View>

        <Text style={styles.subheading}>
          Create a secure four(4) digit PIN for authorizing all your
          transactions
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            maxLength={1}
            secureTextEntry
            keyboardType="number-pad"
            caretHidden={true}
            onFocus={() => setActive1(true)}
            onEndEditing={() => setActive1(false)}
            style={{
              width: 50,
              height: 50,
              borderColor: active1 ? COLORS.focus : COLORS.inputBorder,
              borderWidth: 2,
              fontSize: 25,
              paddingLeft: 15,
              color: "white",
            }}
            ref={input_1}
            onChangeText={(value) => {
              getValue1(value);
              if (value) {
                input_2.current.focus();
              }
            }}
          />
          <TextInput
            maxLength={1}
            secureTextEntry
            keyboardType="number-pad"
            caretHidden={true}
            onFocus={() => setActive2(true)}
            onEndEditing={() => setActive2(false)}
            style={{
              width: 50,
              height: 50,
              borderColor: active2 ? COLORS.focus : COLORS.inputBorder,
              borderWidth: 2,
              fontSize: 25,
              paddingLeft: 15,
              color: "white",
            }}
            ref={input_2}
            onChangeText={(value) => {
              getValue2(value);
              if (value) {
                input_3.current.focus();
              }
            }}
          />
          <TextInput
            onFocus={() => setActive3(true)}
            onEndEditing={() => setActive3(false)}
            maxLength={1}
            secureTextEntry
            keyboardType="number-pad"
            caretHidden={true}
            style={{
              width: 50,
              height: 50,
              borderColor: active3 ? COLORS.focus : COLORS.inputBorder,
              borderWidth: 2,
              fontSize: 25,
              paddingLeft: 15,
              color: "white",
            }}
            ref={input_3}
            onChangeText={(value) => {
              getValue3(value);
              if (value) {
                input_4.current.focus();
              }
            }}
          />
          <TextInput
            onFocus={() => setActive4(true)}
            onEndEditing={() => setActive4(false)}
            style={{
              width: 50,
              height: 50,
              borderColor: active4 ? COLORS.focus : COLORS.inputBorder,
              borderWidth: 2,
              fontSize: 25,
              paddingLeft: 15,
              color: "white",
            }}
            ref={input_4}
            maxLength={1}
            secureTextEntry
            keyboardType="number-pad"
            caretHidden={true}
            onChangeText={(value) => {
              getValue4(value);
            }}
          />
        </View>

        {/* <Button text='create' onPress={pushUserInfoPinServer} /> */}
        <CustomButton
          title={loading ? "creating..." : "create"}
          onPress={pushUserInfoPinServer}
        />
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("home");
          }}
        >
          <Text>i dont know</Text>
        </TouchableOpacity> */}

        <ActivityIndicator
          size={"large"}
          color={"white"}
          animating={loading}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
};

export default CreateTransferPin;
