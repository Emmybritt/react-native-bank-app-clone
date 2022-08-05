import { View, Image, Text, TextInput, ActivityIndicator } from "react-native";
import styles from "../../styles/others/transferconfirm";
import Button from "../../component/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { authorizeTransactionRoute } from "../../helpers/utils/Apiroutes/ServerRoutes";
import { COLORS } from "../../helpers/theme/constantstyles";

import axiosInstance from "../../helpers/axios/axiosInterceptor";

import { SuccessModal, ErrorModal } from "../../component/ModalPopUp";
import CustomButton from "../../common/button/Index";

const AuthorizeUlegoTransfer = () => {
  const [pin, setPin] = useState("");
  const [editable, setEditable] = useState(true);
  const [transactionData, setTransactionData] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPin = (value) => {
    if (value.length == 4) {
      setEditable(false);
    }
    setPin(value);
  };

  const RemoveError = () => {
    setErrorVisible(false)
    setErrorMessage(null)
  }

  const getTransferData = async () => {
    try {
      const transData = await AsyncStorage.getItem("UlegoData");
      const tData = JSON.parse(transData);
      setTransactionData(tData);
    } catch (error) {
      alert("There was an error , try again later");
    }
  };

  useEffect(() => {
    getTransferData();
  }, []);

  const authorizeTransaction = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `${authorizeTransactionRoute}`,
        { pin },
        {
          params: {
            Reference: `${transactionData.reference}`,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      

      if (res.data.status) {
        setLoading(false);
        setSuccessVisible(true);
      } else if (!res.data.status) {
        setLoading(false);
        setErrorVisible(true);
        setErrorMessage(res.data.error_message)
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        alert("There was an error try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSecondary}>
        <View style={styles.containerTertiary}>
          <Text style={styles.amount}>{transactionData.amount}</Text>
          <Text style={styles.subheading}>Transfer details</Text>

          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text>Account Number:</Text>
              <Text>{transactionData.beneficiary_account_number}</Text>
            </View>
            <View style={styles.info}>
              <Text>Name:</Text>
              <Text>{transactionData.beneficiary_name}</Text>
            </View>
            <View style={styles.info}>
              <Text>Bank:</Text>
              <Text>{transactionData.beneficiary_bank_name}</Text>
            </View>

            <View style={styles.info}>
              <Text>Description</Text>
              <Text style={{flexWrap: "wrap"}}>{transactionData.remark}</Text>
            </View>
          </View>

          <View style={styles.warning}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/clock.png")}
            />
            <Text>
              The money will be transferred immediately after you confirm
            </Text>
          </View>
          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={(value) => {
              getPin(value);
            }}
            editable={editable ? true : false}
            secureTextEntry
            placeholder="input transfer pin"
            maxLength={4}
          />
          {/* <Button text="Confirm and Transfer" onPress={authorizeTransaction} /> */}
          <CustomButton onPress={authorizeTransaction} title={loading ? "Payment in progress..." : "Confirm and Transfer"} />

          <ActivityIndicator
            style={{ top: "5%" }}
            animating={loading}
            size={"large"}
            color={COLORS.primary}
          />
        </View>

        {errorVisible ? <ErrorModal errorMessage={errorMessage} removeError={RemoveError} visible={true} /> : null}
      </View>
      <SuccessModal visible={successVisible} checkBeneficiary={false} />
    </View>
  );
};

export default AuthorizeUlegoTransfer;
