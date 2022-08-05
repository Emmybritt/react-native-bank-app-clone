import { View, Image, Text, TextInput, ActivityIndicator } from "react-native";
import styles from "../../styles/others/transferconfirm";
import Button from "../../component/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {
  authorizeTransactionRoute,
  saveTransferBeneficiary,
  getReceipt,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import { COLORS } from "../../helpers/theme/constantstyles";

import axiosInstance from "../../helpers/axios/axiosInterceptor";

import { SuccessModal, ErrorModal } from "../../component/ModalPopUp";
import CustomButton from "../../common/button/Index";

const TransferConfirm = () => {
  const [pin, setPin] = useState("");
  const [editable, setEditable] = useState(true);
  const [transactionData, setTransactionData] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const getPin = (value) => {
    if (value.length == 4) {
      setEditable(false);
      
    }
    setPin(value);
  };

  const RemoveError = () =>  {
      console.log('This is nice');
      setErrorMessage(null)
      setErrorVisible(false)
  }

  const getTransferData = async () => {
    try {
      const transData = await AsyncStorage.getItem("Data");
      const transactionData = JSON.parse(transData);
      setTransactionData(transactionData);
    } catch (error) {
      console.log(error);
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

      console.log(res.data, transactionData.reference);

      if (res.data.status) {
        setLoading(false);
        setSuccessVisible(true);
      } else if (!res.data.status) {
        setLoading(false);
        setErrorVisible(true);
        setPin(null);
        setEditable(true)
        setErrorMessage(res.data.error_message);
      }
    } catch (error) {
      if (error) {
        alert("Seems you don't have an internet connection.");
        setLoading(false);
      }
    }
  };

  const saveBeneficiary = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const res = await axiosInstance.post(
        `${saveTransferBeneficiary}`,
        { transactionReference: `${transactionData.reference}` },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (res.data.status) {
        alert("Beneficiary saved");
      }
    } catch (error) {
      alert("there was an error saving beneficiary,try again later");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSecondary}>
        <View style={styles.containerTertiary}>
          <Text
            style={styles.amount}
          >{`\u20A6 ${transactionData.amount}`}</Text>
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
              <Text>Description </Text>
              <Text style={{flex: 1, flexWrap: 'wrap'}}>{transactionData.remark}</Text>
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
          />

          {/* {passwordError && <Text>{passwordError}</Text>} */}
          {/* <Button text='Confirm and Transfer' onPress={authorizeTransaction} disabled={pin ? false : true}/> */}
          <CustomButton
            title={loading ? "Please wait..." : "Confirm and Transfer"}
            onPress={authorizeTransaction}
            disabled={pin ? false : true}
          />

          <ActivityIndicator
            style={{ top: "5%" }}
            animating={loading}
            size={"large"}
            color={COLORS.primary}
          />
        </View>
        {errorVisible ? (
          <ErrorModal visible={true} removeError={RemoveError} errorMessage={errorMessage} />
        ) : null}
      </View>
      <SuccessModal
        visible={successVisible}
        beneficiary={saveBeneficiary}
        checkBeneficiary={true}
      />
    </View>
  );
};

export default TransferConfirm;
