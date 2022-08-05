import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import axiosInstance from "../../helpers/axios/axiosInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { allTransactionHistory } from "../../helpers/utils/Apiroutes/ServerRoutes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../helpers/theme/constantstyles";

const EmptyTransaction = () => {
  return (
    <Text style={{textAlign: 'center', fontSize: 12, color: COLORS.darkGreen}}>No transactions has been made!!!</Text>
  )
}

const AllTransactions = () => {
  const [transactionHistory, setTransactionHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getAllTransactionistory();
    }, [])
  );

  const getAllTransactionistory = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axiosInstance(`${allTransactionHistory}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      // console.log(res.data);

      if (res.data.status) {
      setTransactionHistory(res.data.result);
      }


      setLoading(false);
    } catch (e) {
      alert("Can't get transactions , try again!");
    }
  };

  return (
    <View style={styles.containerPrimary}>
      <Text style={styles.heading}>All Transactions</Text>

      {transactionHistory ? (
        <FlatList ListEmptyComponent={<EmptyTransaction />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={transactionHistory}
          renderItem={({ item }) => {
            if (item.debit_or_credit_text == "Debit") {
              var name = item.to_account_name.split(" ");
            } else {
              var name = item.from_account_name.split(" ");
            }

            if (name.length > 1) {
              var newName = `${name[0]} ${name[1]}`;
            } else {
              var newName = `${name[0]}`;
            }

            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate("Transaction Details", {
                  id: item.transaction_id
                })
              }} style={styles.transaction}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 50, height: 50, borderRadius: 15 }}
                />

                <View style={{marginLeft: '6%'}}>
                  <Text style={{ fontWeight: "700", fontSize: 10 }}>
                    {newName}
                  </Text>
                  <Text style={{ color: "grey", fontSize: 10 }}>
                    {item.date_created}
                  </Text>
                </View>
                </View>

                <Text
                  style={[
                    `${item.debit_or_credit_text}` === "Debit"
                      ? { color: "red" }
                      : { color: "green" },
                    {
                      fontWeight: "500",
                      position: "absolute",
                      right: "5%",
                      top: "40%",
                    },
                  ]}
                >
                  {item.debit_or_credit_text === "Debit"
                    ? `- \u20A6 ${item.amount}`
                    : ` + \u20A6 ${item.amount}`}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.transaction_id}
        />
      ) : (
        <ActivityIndicator animating={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    paddingHorizontal: "5%",
    paddingVertical: "10%",
  },
  transaction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 20,
  },
});

export default AllTransactions;
