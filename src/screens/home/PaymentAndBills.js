import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import styles from "../../styles/others/deposit";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import { getUtilityServices } from "../../helpers/utils/Apiroutes/ServerRoutes";

import { useNavigation } from "@react-navigation/native";

import { useState } from "react";

const PaymentAndBills = () => {
  const [utilities, setUtilities] = useState();

  const getServiceUtility = async () => {
    try {
      const res = await axiosInstance.get(`${getUtilityServices}`);
      const data = await res.data.result;

      if (!res.data) {
        alert('Ensure that you are connected to an internet')
      }
      if (res.data.status) {
        setUtilities(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceUtility();
  }, []);

  const additionalUtilityInfo = [
    {
      image: require("../../../assets/images/telephone.png"),
      footerText: "Recharge any network easily",
      navigation: "Buy Airtime",
      id: 1,
    },
    {
      image: require("../../../assets/images/data.png"),
      footerText: "Recharge your mobile data at lightening speed",
      navigation: "Buy Data",
      id: 2,
    },
    {
      image: require("../../../assets/images/tv.png"),
      footerText: "Pay for your cable TV subscription stress free",
      navigation: "cable tv",
      id: 3,
    },
    {
      image: require("../../../assets/images/idea.png"),
      footerText: "Pay your electricity bill without hassle",
      navigation: "Electricity Payment",
      id: 4,
    },
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: "5%",
          marginTop: "10%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {utilities ? (
          utilities.map((el, index) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  width: "48%",
                  marginBottom: 16,
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 8,
                }}
                onPress={() =>
                  navigation.navigate(additionalUtilityInfo[index].navigation)
                }
                key={index}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={additionalUtilityInfo[index].image}
                />
                <Text style={{ fontWeight: "600", marginVertical: 8 }}>
                  {el.description}
                </Text>
                <Text style={{ color: "grey", fontSize: 9 }}>
                  {additionalUtilityInfo[index].footerText}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <ActivityIndicator
            animating={true}
            color="#0B535B"
            size="large"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PaymentAndBills;
