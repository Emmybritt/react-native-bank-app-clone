import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import Button from "../../component/Button";
import {
  authorizeData,
  dataBeneficiary,
  getReceipt,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import styles from "../../styles/others/bills";
import { SuccessModal, ErrorModal } from "../../component/ModalPopUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../helpers/theme/constantstyles";
import CustomButton from "../../common/button/Index";

const ConfirmData = () => {
  const [pin, setPin] = useState();
  const [data, setData] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getDataPurchaseData = async () => {
    try {
      const dataPurchaseData = await AsyncStorage.getItem("dataPurchaseData");
      const databundleInfo = JSON.parse(dataPurchaseData);
      setData(databundleInfo);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDataPurchaseData();
  }, []);

  const authorizeDataPurchase = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axiosInstance.post(
        `${authorizeData}${data.reference}`,
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
        setLoading(false);
      }
      if (!res.data.status) {
        setErrorVisible(true);
        setErrorMessage(res.data.error_message);
        setLoading(false);
      }
    } catch (error) {
      setErrorVisible(true);
      setErrorMessage("There was an error , try again later!");
      setLoading(false);
    }
  };

  const printReceipt = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(transactionData.reference);

    try {
      const res = await axiosInstance.get(
        `${getReceipt}${transactionData.reference}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const RemoveError = () => {
    console.log("it is working");
    setErrorMessage("");
    setErrorVisible(false)
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPrimary}>
        <Text style={styles.amount}>{`\u20A6 ${data.amount}`}</Text>

        <View style={styles.containerSecondary}>
          <Text style={styles.detail}>Purchase Details</Text>

          <View style={styles.info}>
            <Text style={styles.text}>Number:</Text>
            <Text style={styles.text}>{data.beneficiary_number}</Text>
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
          <ErrorModal
            removeError={RemoveError}
            visible={true}
            errorMessage={errorMessage}
          />
        ) : null}

        <View style={styles.buttonContainer}>
          {/* <Button text='Next' onPress={authorizeDataPurchase}/> */}
          <CustomButton
            onPress={authorizeDataPurchase}
            title={loading ? "Please wait.." : "Next"}
          />
        </View>
        <ActivityIndicator
          animating={loading}
          color={COLORS.primary}
          size="large"
          style={{ marginTop: 16 }}
        />
      </View>
      <SuccessModal visible={successVisible} checkBeneficiary={false} />
    </View>
  );
};

export default ConfirmData;
