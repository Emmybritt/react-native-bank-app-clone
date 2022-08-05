import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GroupIcon from "../common/GroupIcon";
import PathSvg from "../common/PathSvg";
import { fetchSingleTransactionDetails } from "../redux/features/TransactionDetailsSlice";
import style from "./registration/NewWalletCreation/style";
import moment from 'moment';

const TransactionDetails = ({ route }) => {
  const dispatch = useDispatch();
  const { isLoding, transactionDetails, errorMessage } = useSelector(
    (store) => store.transactionDetails
  );
  const { id } = route.params;

  // console.log(transactionDetails);

  useEffect(() => {
    dispatch(fetchSingleTransactionDetails(id));
  }, []);
  return (
    <View>
      {isLoding ? (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <View>
            <View style={styles.transfer}>
              <Text style={{ textAlign: "center" }}>
                {transactionDetails && transactionDetails.debit_or_credit_text}
              </Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: "#0B535B",
                marginTop: 10,
              }}
            >
              {transactionDetails && 'on ' + moment(transactionDetails.created_at).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Amount</Text>
              <View style={styles.context}>
                <Text style={styles.inputText}>
                  {transactionDetails && "\u20A6" + transactionDetails.amount}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Account Name</Text>
              <View style={styles.context}>
                <Text style={styles.inputText}>
                  {transactionDetails && transactionDetails.to_account_name}
                </Text>
                <Text
                  style={{
                    borderRadius: 100,
                    height: 40,
                    width: 40,
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Account Number</Text>
              <View style={styles.context}>
                <Text style={styles.inputText}>
                  {transactionDetails && transactionDetails.to_account_number}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Bank</Text>
              <View style={styles.context}>
                <Text style={styles.inputText}>
                  {transactionDetails && transactionDetails.service_type}
                </Text>
                {transactionDetails && <Image
                  style={styles.image}
                  source={{ uri: transactionDetails.image_url }}
                />}
                
              </View>
            </View>
            <View>
              <Text style={styles.text}>Description</Text>
              <View style={styles.context}>
                <Text style={styles.inputText}>
                  {transactionDetails && transactionDetails.description}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GroupIcon />
            <View style={{ marginLeft: 10 }}>
              <Image />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  transfer: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#ddd",
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 8,
    width: "30%",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 16,
    color: "#DDDDDD",
    marginHorizontal: 8,
  },
  image: {
    height: 40,
    width: 40,
  },
  context: {
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  inputText: {
    fontSize: 16,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});
