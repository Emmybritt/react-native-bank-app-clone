import { View, Text, TextInput, ActivityIndicator } from "react-native";
import styles from "../../styles/others/bills";
import { SuccessModal, ErrorModal } from "../../component/ModalPopUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {
  authorizeCablePurchase,
  cableBeneficiary,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import Button from "../../component/Button";
import { COLORS } from "../../helpers/theme/constantstyles";
import CustomButton from "../../common/button/Index";

const ConfirmCablePurchase = () => {
  const [data, setData] = useState();
  const [pin, setPin] = useState();

  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const RemoveError = () => {
    setErrorVisible(prev => !prev)
  }

  const getTransferData = async () => {
    try {
      setLoading(true);

      const data = await AsyncStorage.getItem("cableData");

      const cableData = JSON.parse(data);

      setData(cableData);
    } catch (error) {
      alert("There was an error , check your network and retry");
    }
  };

  useEffect(() => {
    getTransferData();
    setLoading(false);
  }, []);

  const authorizePurchase = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsLoading(true);

    try {
      const res = await axiosInstance.post(
        `${authorizeCablePurchase}${data.reference}`,
        { pin },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      console.log(res.data);

      if (res.data.status) {
        setSuccessVisible(true);
        setIsLoading(false);
      }
      if (!res.data.status) {
        setErrorVisible(true);
        setErrorMessage(res.data.error_message);
        setIsLoading(false);
      }
    } catch (error) {
      alert("There was an error , kindly try again");
      setIsLoading(false);
    }
  };

  return data ? (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <Text style={styles.amount}>{`\u20A6 ${data.amount}`}</Text>

        <View style={styles.containerSecondary}>
          <Text style={styles.detail}>Purchase Details</Text>

          <View style={styles.info}>
            <Text style={styles.text}>Number:</Text>
            <Text style={styles.text}>
              {data.beneficiary_smart_card_number}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.text}>Network:</Text>
            <Text style={styles.text}>{data.service_provider}</Text>
          </View>

          <TextInput
            value={pin}
            onChangeText={(value) => setPin(value)}
            maxLength={4}
            style={styles.input}
            placeholder="Input transfer pin"
            keyboardType="numeric"
            secureTextEntry
          />
        </View>

        {errorVisible ? (
          <ErrorModal visible={true} removeError={RemoveError} errorMessage={errorMessage} />
        ) : null}

        <View style={styles.buttonContainer}>
          {/* <Button text="Next" onPress={authorizePurchase} /> */}
          <CustomButton onPress={authorizePurchase} title={isLoading ? 'Please wait...' : 'Next'} />
        </View>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          animating={isLoading}
          style={{ marginTop: 16 }}
        />
      </View>
      <SuccessModal visible={successVisible} checkBeneficiary={false} />
    </View>
  ) : (
    <ActivityIndicator animating={loading} />
  );
};

export default ConfirmCablePurchase;
