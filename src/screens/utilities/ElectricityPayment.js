import { View, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import {
  electricityPaymentRoute,
  verifyNumberRoute,
  initiateElectricityPurchase,
} from "../../helpers/utils/Apiroutes/ServerRoutes";

import AsyncStorage from "@react-native-async-storage/async-storage";

import SelectDropdown from "react-native-select-dropdown";
import { COLORS } from "../../helpers/theme/constantstyles";
import styles from "../../styles/others/utility";

import { TextInput } from "react-native-paper";
import Button from "../../component/Button";

import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../common/button/Index";

const ElectricityPayment = () => {
  const [powerProviders, setPowerProviders] = useState();
  const [powerProvider, setPowerProvider] = useState();
  const [amount, setAmount] = useState();
  const [meterNumber, setMeterNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [beneficiary, setBeneficiary] = useState();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log('This is the email',email);

  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);

  const getElectricityProviders = async () => {
    try {
      const res = await axiosInstance.get(`${electricityPaymentRoute}`);

      setPowerProviders(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getElectricityProviders();
  }, []);

  const verifyMeterNumber = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance(
        `${verifyNumberRoute}?serviceType=${powerProvider}&card_number=${meterNumber}`
      );

      const user = await res.data.result[0].name;

      setBeneficiary(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();

  const initiatePowerPurchase = async () => {
    const powerPayload = {
      serviceType: "electricity",
      serviceProvider: `${powerProvider}`,
      amount,
      meterNumber,
      beneficiaryEmail: email,
    };

    const token = await AsyncStorage.getItem("token");

    setIsLoading(true);

    try {
      const res = await axiosInstance.post(
        `${initiateElectricityPurchase}`,
        powerPayload,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      const powerData = await res.data.result[0];

      await AsyncStorage.setItem("powerInfo", JSON.stringify(powerData));

      if (res.data.status) {
        navigation.navigate("confirm electricity");
        setIsLoading(false);
      }
      if (!res.data.status) {
        alert("There was an error , try again later");
        setIsLoading(false);
      }
    } catch (error) {
      alert("There was an error , try again later");
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSecondary}>
        <SelectDropdown
          data={powerProviders}
          onSelect={(power) => {
            setPowerProvider(power.id);
            input_1.current.clear();
            input_2.current.clear();
            input_3.current.clear();
            input_4.current.clear();
          }}
          buttonTextAfterSelection={(power) => {
            return power.description;
          }}
          rowTextForSelection={(power) => {
            return power.description;
          }}
          buttonStyle={{
            width: "100%",
            borderColor: COLORS.background,
            backgroundColor: COLORS.background,
            borderBottomColor: "black",
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: "5%",
          }}
          defaultButtonText={"Select Power Provider"}
          buttonTextStyle={{ textAlign: "left", color: "grey", fontSize: 13 }}
          dropdownStyle={{
            backgroundColor: "white",
            borderRadius: 20,
            borderColor: "grey",
            borderWidth: 2,
          }}
          rowTextStyle={{ color: "grey" }}
        />

        <TextInput
          mode="flat"
          activeUnderlineColor={COLORS.primary}
          underlineColor="black"
          placeholder="Meter Number"
          keyboardType="numeric"
          style={styles.input}
          value={meterNumber}
          onChangeText={(value) => {
            setMeterNumber(value);
          }}
          onEndEditing={() => {
            verifyMeterNumber();
          }}
          ref={input_1}
          editable={powerProvider ? true : false}
        />

        <TextInput
          mode="flat"
          activeUnderlineColor={COLORS.primary}
          underlineColor="black"
          placeholder="Email To Receive Token"
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          ref={input_4}
          editable={meterNumber ? true : false}
        />

        <ActivityIndicator
          animating={loading}
          size="large"
          style={{ position: "absolute", top: "50%", zIndex: 1, left: "40%" }}
        />

        <TextInput
          mode="flat"
          underlineColor="black"
          editable={false}
          value={beneficiary}
          style={[styles.input, { display: beneficiary ? "flex" : "none" }]}
          ref={input_2}
        />

        <TextInput
          mode="flat"
          activeUnderlineColor={COLORS.primary}
          underlineColor="black"
          value={amount}
          style={styles.input}
          placeholder="Amount"
          onChangeText={(value) => setAmount(value)}
          keyboardType="numeric"
          ref={input_3}
          editable={email ? true : false}
        />

        <View style={styles.buttonContainer}>
          {/* <Button
            text="Next"
            onPress={initiatePowerPurchase}
            disabled={amount ? false : true}
          /> */}
          <CustomButton disabled={amount ? false : true} title="Next" onPress={initiatePowerPurchase} />
        </View>

        <ActivityIndicator
          animating={isLoading}
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
};

export default ElectricityPayment;
