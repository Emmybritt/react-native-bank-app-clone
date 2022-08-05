import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import {
  dataProvidersRoute,
  initiateDataPurchase,
  getDataBeneficiary,
} from "../../helpers/utils/Apiroutes/ServerRoutes";

import SelectDropdown from "react-native-select-dropdown";
import { COLORS } from "../../helpers/theme/constantstyles";
import styles from "../../styles/others/utility";

import { TextInput } from "react-native-paper";
import Button from "../../component/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../common/button/Index";

const BuyData = () => {
  const [network, setNetwork] = useState();
  const [networkID, setNetworkID] = useState();
  const [dataProviders, setDataProviders] = useState("");
  const [plans, setPlans] = useState();
  const [price, setPrice] = useState();
  const [planType, setPlanType] = useState();
  const [dataCode, setDataCode] = useState();
  const [BeneficiaryNumber, setBeneficiaryNumber] = useState();
  const [beneficiaries, setBeneficiaries] = useState();
  const [defaultText, setDefaultText] = useState("Select Network");

  const [loading, setLoading] = useState(false);

  const dropDown = useRef(null);
  const input_1 = useRef(null);
  const input_2 = useRef(null);

  const getDataProviders = async () => {
    try {
      const res = await axiosInstance.get(`${dataProvidersRoute}`);

      if (res.data) {
        setDataProviders(res.data.result);
      }else{
        alert(res.data.error_message);
      }

    } catch (error) {
      alert("Network error, check your internet connection");
    }
  };

  getDataProviders();

  useEffect(() => {
    if (networkID) {
      getPlans();
    }
  }, [networkID]);

  const getPlans = async () => {
    try {
      const res = await axiosInstance(
        `api/BillsAndUtility/service/plans/request?serviceType=databundle&serviceProvider=${networkID}`
      );

      setPlans(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const amount = parseInt(price);

  const transferData = {
    serviceType: "databundle",
    serviceProvider: `${networkID}`,
    amount: `${parseFloat(amount)}`,
    BeneficiaryNumber,
    dataCode,
    plan: `${networkID}`,
  };

  const navigation = useNavigation();

  const initiatePurchase = async () => {
    const toke = await AsyncStorage.getItem("token");
    const token = JSON.parse(toke);
    // console.log(token);

    setLoading(true);

    try {
      // console.log(transferData);

      const res = await axiosInstance.post(
        `${initiateDataPurchase}`,
        transferData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(res.data);

      const databundleData = await res.data.result[0];
      await AsyncStorage.setItem(
        "dataPurchaseData",
        JSON.stringify(databundleData)
      );

      // setLoading(false)
      if (!res.data) {
        setLoading(false);
        alert("Seems you don't have an internet connection");
      }

      if (res.data.status) {
        navigation.navigate("confirm data");
        setLoading(false);
      } else if (!res.data.status) {
        setLoading(false);
        alert("There was an error , kindly try again");
      }
    } catch (error) {
      alert("There was an error, kindly try again");

      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSecondary}>
        {
          <FlatList
            horizontal
            data={beneficiaries}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    // setBankName(`${item.bank_name}`)
                    // setBankCode(`${item.beneficiary_bank_code}`)
                    // setBeneficiaryAccountNumber(`${item.beneficiary_account_number}`)
                    // setBeneficiary(`${item.beneficiary_name}`)
                    // setDefaultText(`${item.bank_name}`)
                  }}
                >
                  {/* <Image style={{height:20,width:20}} source={require('../../../assets/images/b-bank.png')}></Image> */}
                  <Text>{item.beneficiary_name}</Text>
                  {/* <Text>{item.bank_name}</Text> */}
                </TouchableOpacity>
              );
            }}
          />
        }

        <SelectDropdown
          data={dataProviders}
          onSelect={(network) => {
            setNetwork(network.description);
            setNetworkID(network.id);
            dropDown.current.reset();
            input_1.current.clear();
            input_2.current.clear();
          }}
          buttonTextAfterSelection={(network) => {
            //  getPlans()

            return network.description;
          }}
          rowTextForSelection={(network) => {
            return network.description;
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
          defaultButtonText={defaultText}
          buttonTextStyle={{ textAlign: "left", color: "grey", fontSize: 13 }}
          dropdownStyle={{
            backgroundColor: "white",
            borderRadius: 10,
            borderColor: "grey",
            borderWidth: 2,
          }}
          rowTextStyle={{ color: "grey" }}
        />

        <SelectDropdown
          data={plans}
          onSelect={(plan) => {
            setPlanType(plan.description);
            setPrice(plan.price);
            setDataCode(plan.id);

          }}
          buttonTextAfterSelection={(plan) => {
            return plan.description;
          }}
          rowTextForSelection={(plan) => {
            return plan.description;
          }}
          disabled={networkID ? false : true}
          buttonStyle={{
            width: "100%",
            borderColor: COLORS.background,
            backgroundColor: COLORS.background,
            borderBottomColor: "black",
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: "5%",
          }}
          defaultButtonText={"Select Data Plan"}
          buttonTextStyle={{ textAlign: "left", color: "grey", fontSize: 13 }}
          ref={dropDown}
          dropdownStyle={{
            backgroundColor: "white",
            borderRadius: 10,
            borderColor: "grey",
            borderWidth: 2,
          }}
          rowTextStyle={{ color: "grey" }}
        />

        <TextInput
          mode="flat"
          underlineColor="black"
          value={price ? `#${price}` : ""}
          style={styles.input}
          editable={false}
          caretHidden={true}
          placeholder="Price"
          ref={input_1}
        />

        <TextInput
          mode="flat"
          activeUnderlineColor={COLORS.primary}
          underlineColor="black"
          placeholder="Phone Number"
          keyboardType="numeric"
          maxLength={11}
          style={styles.input}
          value={BeneficiaryNumber}
          onChangeText={(value) => setBeneficiaryNumber(value)}
          ref={input_2}
          editable={price ? true : false}
        />

        <View style={styles.buttonContainer}>
          {/* <Button text='Next' onPress={initiatePurchase}/> */}
          <CustomButton
            onPress={initiatePurchase}
            title={loading ? "Please wait.." : "Next"}
          />

          <ActivityIndicator
            animating={loading}
            size="large"
            color={COLORS.primary}
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    </View>
  );
};

export default BuyData;
