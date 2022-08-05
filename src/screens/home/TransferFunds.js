import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  bankPath,
  verifyOtherBankAccount,
  initiateTransferToOtherBanks,
  getTransferBeneficiary,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import { TextInput } from "react-native-paper";
import styles from "../../styles/others/transfers";
import Button from "../../component/Button";
import { COLORS } from "../../helpers/theme/constantstyles";

import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { useState, useEffect, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../common/button/Index";
import CustomDropDown from "../../common/CustomDropDown/Index";
import { useDispatch, useSelector } from "react-redux";
import { getTransferBeneficiaries } from "../../redux/features/TransferBeneficiarySlice";

const TransferFunds = () => {
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [banksList, setBanksList] = useState([]);
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [beneficiary, setBeneficiary] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState("");
  const [isFetching, setFetching] = useState(false)
  const [defaultText, setDefaultText] = useState("Select Bank");
  const dispatch = useDispatch();
  const { TransferBeneficiaries } = useSelector(
    (store) => store.transferBeneficiaries
  );

  const onAccountChange = (value) => {
    setBeneficiaryAccountNumber(value);
  };
  const onAmountChange = (value) => {
    setAmount(value);
  };
  const onRemarkChange = (value) => {
    setRemark(value);
  };

  const checkAmountLimit = () => {
    if (amount < 100) return "error";
  };

  const fetchBeneficiaryName = async () => {
    try {
      setLoading1(true);

      const token = await AsyncStorage.getItem("token");

      const res = await axiosInstance(`${verifyOtherBankAccount}`, {
        params: { account: beneficiaryAccountNumber, bankCode: bankCode },
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const userRes = await res.data;
      if (res.data.status) {
        setBeneficiary(userRes.result[0].name);
        setLoading1(false);
      }
      if (!res.data.status) {
        alert("Account not found");
        setLoading1(false);
      }
    } catch (error) {}
  };

  const checkValidAccount = () => {
    fetchBeneficiaryName();
  };

  useEffect(() => {
    dispatch(getTransferBeneficiaries());

    let isMounted = true;

    const getBankData = async () => {
      try {
        const response = await axiosInstance.get(`${bankPath}`);

        const data = await response.data;

        if (data.status === false) {
          isMounted = false;
          alert(data.error_message);
        }

        if (isMounted) {
          // console.log( data.result.name);
          setBanksList(data.result);
        }
      } catch (error) {}
      return () => {
        isMounted = false;
      };
    };
    getBankData();
  }, []);

  const transferInfo = { beneficiaryAccountNumber, amount, remark, bankCode };

  const navigation = useNavigation();

  const initiateTransfer = async () => {
    // console.log('token');

    try {
      setLoading2(true);

      const token = await AsyncStorage.getItem("token");

      const res = await axiosInstance.post(
        `${initiateTransferToOtherBanks}`,
        transferInfo,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (!res.data.status) {
        setLoading2(false);

        alert(res.data.error_message);
      }

      if (res.data.status) {
        const transData = await res.data.result[0];

        await AsyncStorage.setItem("Data", JSON.stringify(transData));
      }

      if (res.data.status) {
        navigation.navigate("confirm");
        setLoading2(false);
      }
    } catch (error) {
      setLoading2(false);
    }
  };

  const getBeneficiary = async () => {
    // setFetching(true)
    const token = await AsyncStorage.getItem("token");
    // console.log('THIS IS THE TOKEN', token);

    try {
      const res = await axiosInstance(`${getTransferBeneficiary}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      // console.log(res.data);

      if (res.data) {
        let results = res.data.result;
        setBeneficiaries(results);
        // setFetching(false);
      }
    } catch (error) {
      // alert
      // setFetching(false)
    }
  };

  getBeneficiary();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerSecondary}>
        <Text style={styles.subheading}>Select Beneficiary</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 30 }}
        >
          {isFetching && (
            <Text>Fetching beneficiaries...</Text>
          )}
          {TransferBeneficiaries &&
            TransferBeneficiaries.map((beneficiary, i) => {
              return (
                <TouchableOpacity onPress={() => {
                  setBankName(`${beneficiary.bank_name}`);
                    setBankCode(`${beneficiary.beneficiary_bank_code}`);
                    setBeneficiaryAccountNumber(
                      `${beneficiary.beneficiary_account_number}`
                    );
                    setBeneficiary(`${beneficiary.beneficiary_name}`);
                    setDefaultText(`${beneficiary.bank_name}`);
                }} key={i}>
                  <View
                    style={{
                      backgroundColor: "#eee",
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 9,
                      marginRight: 5,
                    }}
                  >
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                        backgroundColor: "white",
                        padding: 10,
                      }}
                    >
                      <Image
                        style={{ height: 40, width: 40 }}
                        source={{ uri: beneficiary.image_url }}
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: 8,
                        color: COLORS.darkGreen,
                        fontWeight: "600",
                      }}
                    >
                      {beneficiary.beneficiary_name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.darkGreen,
                        fontWeight: "300",
                        fontSize: 12,
                      }}
                    >
                      {beneficiary.bank_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        {/* {
          <FlatList
            horizontal
            data={beneficiaries}
            renderItem={({ item, i }) => {
              const name = item.beneficiary_name.split(" ");

              if (name.length > 1) {
                var newName = `${name[0]} ${name[1]}`;
              } else {
                var newName = `${name[0]}`;
              }

              return (
                <TouchableOpacity
                key={i}
                  onPress={() => {
                    setBankName(`${item.bank_name}`);
                    setBankCode(`${item.beneficiary_bank_code}`);
                    setBeneficiaryAccountNumber(
                      `${item.beneficiary_account_number}`
                    );
                    setBeneficiary(`${item.beneficiary_name}`);
                    setDefaultText(`${item.bank_name}`);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={{ uri: item.image_url }}
                  ></Image>
                  <Text>{newName}</Text>
                  <Text>{item.bank_name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        } */}

        <View style={{ position: "relative", width: "100%", zIndex: 40 }}>
          <CustomDropDown
            setDataName={setBankName}
            setDataCode={setBankCode}
            placeHolderText={bankName ? bankName : "Select Bank"}
            data={banksList}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <Image
              style={{ zIndex: 1, top: 20, left: 4, position: "absolute" }}
              source={require("../../../assets/images/aicon.png")}
            />

            <TextInput
              placeholder="Account: **** **** **** 3232"
              style={[styles.input, { height: 45 }]}
              value={beneficiaryAccountNumber}
              onChangeText={(value) => onAccountChange(value)}
              keyboardType="numeric"
              placeholderTextColor={"grey"}
              onEndEditing={(value) => checkValidAccount(value)}
              mode="flat"
              activeUnderlineColor={COLORS.primary}
              editable={bankName ? true : false}
              underlineColor="black"
              selectionColor={COLORS.primary}
            />
          </View>
          <ActivityIndicator
            animating={loading1}
            style={{ position: "absolute", top: "30%", zIndex: 1, left: "40%" }}
            size="large"
            color={COLORS.primary}
          />

          <View>
            <Image
              style={{ zIndex: 1, top: 20, left: 4, position: "absolute" }}
              source={require("../../../assets/images/bicon.png")}
            />

            <TextInput
              placeholder="Amount"
              style={styles.input}
              value={amount}
              keyboardType="number-pad"
              onChangeText={(value) => onAmountChange(value)}
              mode="flat"
              placeholderTextColor={"grey"}
              activeUnderlineColor={COLORS.primary}
              underlineColor="black"
              selectionColor={COLORS.primary}
              editable={beneficiaryAccountNumber ? true : false}
            />
          </View>

          <TextInput
            style={[
              styles.input,
              {
                marginBottom: "10%",
                display: beneficiary ? "flex" : "none",
              },
            ]}
            value={beneficiary}
            editable={false}
            mode="flat"
            placeholderTextColor={"grey"}
            activeUnderlineColor={COLORS.primary}
            underlineColor="black"
          />

          <TextInput
            placeholder="Description (optional)"
            style={styles.input}
            value={remark}
            onChangeText={(value) => onRemarkChange(value)}
            placeholderTextColor={"grey"}
            mode="flat"
            activeUnderlineColor={COLORS.primary}
            underlineColor="black"
            selectionColor={COLORS.primary}
            editable={amount ? true : false}
          />
        </View>
        {/* <Button text='Transfer Now' onPress={initiateTransfer} disabled={amount && beneficiaryAccountNumber ? false : true}/> */}
        <CustomButton
          onPress={initiateTransfer}
          disabled={amount && beneficiaryAccountNumber ? false : true}
          title={loading2 ? "Transfer in progress..." : "Transfer Now"}
        />

        <ActivityIndicator
          style={{ marginTop: 10 }}
          animating={loading2}
          size={"large"}
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
};

export default TransferFunds;
