import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { COLORS } from "../../helpers/theme/constantstyles";
import Button from "../../component/Button";
import { useState } from "react";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { verifyBVNRoute } from "../../helpers/utils/Apiroutes/ServerRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import CustomButton from "../../common/button/Index";

const UpgradeAccount = () => {
  const [BVN, setBVN] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState();

  const verifyBVN = async () => {
    setEmptyFieldError("");
    if (BVN) {
      if (BVN.length === 11) {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("token");
        // console.log(token);

        try {
          const res = await axiosInstance.post(
            `${verifyBVNRoute}${BVN}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          setIsLoading(false);
          console.log(res.data);

          if (!res.data.status) {
            alert(res.data.error_message);
          } else if (res.data.status) {
            alert("Account will be upgraded shortly");
            setIsLoading(false);
          }
        } catch (e) {
          alert("There was an error, kindly try again!");
          setIsLoading(false);
        }
      } else {
        setEmptyFieldError("Bvn length should not be less or greater than 11");
      }
    } else {
      setEmptyFieldError("Ensure that you input your bvn");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <Text style={{ marginLeft: 12, marginBottom: 4, fontWeight: "700" }}>
          BVN
        </Text>

        <TextInput
          value={BVN}
          onChangeText={(value) => setBVN(value)}
          style={styles.input}
          mode="outlined"
          activeOutlineColor={COLORS.primary}
          keyboardType={"number-pad"}
          maxLength={11}
        />

        <Text style={{ color: "red", fontSize: 12, marginTop: 2, marginLeft:6 }}>
          {emptyFieldError && emptyFieldError}
        </Text>

        <View style={styles.buttonContainer}>
          {/* <Button text='Upgrade' disabled={ BVN ? false : true } onPress={verifyBVN}/> */}
          <CustomButton
            onPress={verifyBVN}
            title={isLoading ? "Upgrading..." : "Upgrade"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.bluebg,
    paddingHorizontal: "4%",
  },
  containerPrimary: {
    height: "100%",
    paddingHorizontal: "5%",
    backgroundColor: "#f5f9f9",
    marginTop: "15%",
    paddingTop: "10%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input: {
    // width: "100%",
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 150,
    paddingLeft: 16,
    borderColor: "#ccc",
    borderWidth: 2,
    // borderRadius: 100,
  },
  buttonContainer: {
    marginTop: "20%",
  },
});

export default UpgradeAccount;
