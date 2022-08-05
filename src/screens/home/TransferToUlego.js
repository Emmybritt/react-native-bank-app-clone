import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../helpers/theme/constantstyles";

import Button from "../../component/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  verifyUlegoAccount,
  initiateTransferToUlego,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../common/button/Index";

const TransferToUlego = () => {
  const [beneficiary, setBeneficiary] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [amount, setAmount] = useState();
  // const [transactionData , setTransactionData] = useState('')
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);


  // console.log('From benefici',amount);


  const verifyAccount = async () => {

    setIsLoading(true);

    console.log('it is checking');

    const token = await AsyncStorage.getItem("token");
    console.log(token);
    try {
      const res = await axiosInstance(`${verifyUlegoAccount}`, {
        params: {
          account: beneficiaryAccountNumber,
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (!res.data.status) {
        alert("Account not found");
        setIsLoading(false);
      }

      setBeneficiary(res.data.result[0].name);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const transferPayload = {
    amount,
    remark,
    beneficiaryAccountNumber,
    bankCode: "",
  };

  const navigation = useNavigation();

  const initiateTransfer = async () => {
    const token = await AsyncStorage.getItem("token");

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        `${initiateTransferToUlego}`,
        transferPayload,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );


      console.log(res.data);

      await AsyncStorage.setItem(
        "UlegoData",
        JSON.stringify(res.data.result[0])
      );

      if (!res.data.status) {
        alert(res.data.error_message);
      }

      if (res.data.status) {
        navigation.navigate("ulego confirm");
        setLoading(false);
      }
    } catch (error) {
      alert("There was an error!");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View>
        <Text>Your Balance</Text>
      </View> */}
      <View style={styles.containerPrimary}>
      <Text style={{color: '#B1ACAC', fontSize: 25, marginLeft: 9}}>Receipient</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode="flat"
            activeUnderlineColor={COLORS.primary}
            underlineColor="black"
            selectionColor={COLORS.primary}
            placeholder="Account Number"
            style={[styles.input]}
            maxLength={10}
            onEndEditing={() => verifyAccount()}
            value={beneficiaryAccountNumber}
            onChangeText={(value) => setBeneficiaryAccountNumber(value)}
          />

          {/* This part is working */}

          <TextInput
            mode="flat"
            activeUnderlineColor={COLORS.primary}
            underlineColor="black"
            selectionColor={COLORS.primary}
            placeholder="Amount"
            style={styles.input}
            value={amount}
            onChangeText={(value) => setAmount(value)}
            editable={beneficiaryAccountNumber ? true : false}
          />

          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={COLORS.primary}
            style={{ position: "absolute", top: "20%", left: "40%" }}
          />

          <TextInput
            mode="flat"
            activeUnderlineColor={COLORS.primary}
            underlineColor="black"
            selectionColor={COLORS.primary}
            value={beneficiary}
            style={[styles.input, { display: beneficiary ? "flex" : "none" }]}
            onChangeText={(value) => setBeneficiary(value)}
            editable={false}
          />

          <TextInput
            mode="flat"
            activeUnderlineColor={COLORS.primary}
            underlineColor="black"
            selectionColor={COLORS.primary}
            placeholder="Description"
            style={styles.input}
            value={remark}
            onChangeText={(value) => setRemark(value)}
            editable={beneficiary ? true : false}
          />
        </View>
        {/* <Button
          text="Transfer"
          onPress={initiateTransfer}
          disabled={beneficiaryAccountNumber && amount ? false : true}
        /> */}
        <CustomButton disabled={beneficiaryAccountNumber && amount ? false : true} onPress={initiateTransfer} title={loading ? 'Transfering...' : 'Transfer Now'} />
        {/* <Image style={{alignSelf: 'center', marginTop:3}} source={require('../../../assets/Group257.png')} /> */}

        <ActivityIndicator
          animating={loading}
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    color: COLORS.background,
    paddingHorizontal: "5%",
    backgroundColor: COLORS.background,
  },
  containerPrimary: {
    marginTop: "10%",
  },
  input: {
    marginBottom: "2%",
    backgroundColor: COLORS.background,
    borderWidth: 4,
    borderColor: COLORS.background,
  },
  inputContainer: {
    marginBottom: "10%",
  },
});

export default TransferToUlego;
