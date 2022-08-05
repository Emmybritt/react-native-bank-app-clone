import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../helpers/theme/constantstyles";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import {
  airtimeProviders,
  initiateAirtimePurchase,
  getAirtimeBeneficiary,
} from "../../helpers/utils/Apiroutes/ServerRoutes";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../component/Button";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../common/button/Index";
import { useDispatch, useSelector } from "react-redux";
import {
  initiateUserAirtimePurchase,
  setErrorMsgNull,
} from "../../redux/features/AirtimeSlice";
import { FetchUserProfile } from "../../redux/features/UserProfileSlice";

const BuyAirtime = () => {
  const [networkProvider, setNetworkProvider] = useState();
  const [amount, setAmount] = useState();

  const [networkID, setNetworkID] = useState();
  const [BeneficiaryNumber, setBeneficiaryNumber] = useState();
  const [beneficiaries, setBeneficiaries] = useState();
  const [defaultText, setDefaultText] = useState("Select Network");
  const [loading, setLoading] = useState(false);
  const isLoading = useSelector((state) => state.airtime.isLoading);
  const userBalance = useSelector((store) => store.userProfile.data.balance);
  const isInnitiated = useSelector((store) => store.airtime.isInnitiated);
  const { errorMsg } = useSelector((store) => store.airtime);
  console.log("Thisis initited", isInnitiated);

  // console.log(userBalance);

  const dispatch = useDispatch();

  const input_1 = useRef(null);
  const input_2 = useRef(null);

  const getAirtimeProviders = async () => {
    try {
      const res = await axiosInstance.get(`${airtimeProviders}`);
      setNetworkProvider(res.data.result);
      // console.log(res.data.result);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    if (isInnitiated === true) {
      navigation.navigate("confirm airtime");
    }
  }, [isInnitiated]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      dispatch(FetchUserProfile(JSON.parse(token)));
    })();

    let isMount = true;
    if (isMount) {
      getAirtimeProviders();
    }
  }, []);

  const navigation = useNavigation();

  const initiatePurchase = async () => {
    dispatch(setErrorMsgNull());
    const balance = await AsyncStorage.getItem("currentBalance");

    const airtimePayload = {
      serviceType: "airtime",
      serviceProvider: `${networkID}`,
      amount,
      BeneficiaryNumber,
    };
    // console.log(airtimePayload);
    const token = await AsyncStorage.getItem("token");

    // console.log(amount);
    if (parseInt(amount) > userBalance) {
      alert("Can't perform transaction due to insufficient funds");
    } else if (amount > 30000) {
      alert("Your amount exceed airtime transactions limit.");
    } else {
      dispatch(initiateUserAirtimePurchase({ airtimePayload, token }));
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.containerSecondary}>
        <SelectDropdown
          data={networkProvider}
          onSelect={(network) => {
            input_1.current.clear();
            input_2.current.clear();
            networkProvider ? setNetworkID(network.id) : null;
            console.log(network);
          }}
          buttonTextAfterSelection={(network) => {
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
            marginBottom: "5%",
          }}
          defaultButtonText={defaultText}
          buttonTextStyle={{ textAlign: "left", color: "grey", fontSize: 14 }}
          dropdownStyle={{
            backgroundColor: "white",
            borderRadius: 17,
            borderColor: "grey",
            borderWidth: 0,
          }}
          rowTextStyle={{ color: "grey" }}
        />

        <TextInput
          mode="flat"
          activeUnderlineColor={COLORS.primary}
          underlineColor="black"
          selectionColor={COLORS.primary}
          placeholder="Mobile Number"
          keyboardType="numeric"
          maxLength={11}
          style={styles.input}
          value={BeneficiaryNumber}
          onChangeText={(value) => setBeneficiaryNumber(value)}
          ref={input_2}
          editable={networkID ? true : false}
        />

        <TextInput
          mode="flat"
          activeUnderlineColor={COLORS.primary}
          underlineColor="black"
          selectionColor={COLORS.primary}
          placeholder="Amount"
          style={styles.input}
          value={amount}
          onChangeText={(value) => setAmount(value)}
          ref={input_1}
          keyboardType="numeric"
          editable={BeneficiaryNumber ? true : false}
        />
        <View style={{ alignSelf: "flex-end" }}>
          <Text>{errorMsg && errorMsg}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* <Button text={loading ? 'In Progress...' : 'Next'} onPress={initiatePurchase} disabled={amount && BeneficiaryNumber ? false : true}/> */}
          <CustomButton
            onPress={initiatePurchase}
            title={isLoading ? "In Progress..." : "Next"}
            disabled={amount && BeneficiaryNumber ? false : true}
          />
        </View>
        <ActivityIndicator
          animating={isLoading}
          size={"large"}
          style={{ marginTop: 16 }}
          color={COLORS.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    backgroundColor: COLORS.background,
  },
  buttonContainer: {
    marginTop: "10%",
  },
  containerSecondary: {
    marginTop: "10%",
    backgroundColor: COLORS.background,
  },
  input: {
    marginBottom: "5%",
    paddingLeft: 6,
    backgroundColor: COLORS.background,
  },
});

export default BuyAirtime;
